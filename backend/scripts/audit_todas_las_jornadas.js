/**
 * SCRIPT DE AUDITORÍA COMPLETA DE TODAS LAS JORNADAS (SESIONES)
 * Distribuidora Trébol
 *
 * Muestra para CADA JORNADA iniciada por los distribuidores:
 * 1. Qué pedidos fueron asignados / subidos al camión.
 * 2. El total de pedidos.
 * 3. El total de cada producto asignado (venta regular + bonificaciones 🎁).
 * 4. Cuánto se entregó, cuánto se devolvió y cuánto dinero se cobró.
 *
 * Uso:
 *   node scripts/audit_todas_las_jornadas.js                     # Lista todas las jornadas
 *   node scripts/audit_todas_las_jornadas.js --session 5         # Detalle de la jornada #5
 *   node scripts/audit_todas_las_jornadas.js --distributor Juan  # Solo jornadas de Juan
 */

const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const args = process.argv.slice(2);
let sessionFilter = null;
let distributorFilter = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--session' && args[i + 1]) {
    sessionFilter = parseInt(args[i + 1], 10);
    i++;
  } else if (args[i] === '--distributor' && args[i + 1]) {
    distributorFilter = args[i + 1].toLowerCase();
    i++;
  } else if (!args[i].startsWith('--') && !isNaN(parseInt(args[i], 10))) {
    sessionFilter = parseInt(args[i], 10);
  } else if (!args[i].startsWith('--')) {
    distributorFilter = args[i].toLowerCase();
  }
}

const line = (char = '─', len = 80) => char.repeat(len);
const pad = (str, len, align = 'left') => {
  const s = String(str ?? '');
  if (s.length >= len) return s.substring(0, len);
  return align === 'right' ? s.padStart(len) : s.padEnd(len);
};
const money = (val) => `Bs. ${Number(val || 0).toFixed(2)}`;
const fmtDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleString('es-BO', { timeZone: 'America/La_Paz' });
};

async function auditAllSessions() {
  const client = await pool.connect();
  try {
    console.log('\n' + line('═'));
    console.log(' 🔍 AUDITORÍA HISTÓRICA DE JORNADAS Y CARGAS AL CAMIÓN');
    console.log('    Distribuidora Trébol');
    if (sessionFilter) console.log(`    Filtro por Sesión ID: #${sessionFilter}`);
    if (distributorFilter) console.log(`    Filtro por Distribuidor: "${distributorFilter}"`);
    console.log(line('═'));

    // 1. Obtener todas las sesiones de distribución
    let sessionsQuery = `
      SELECT 
        s.id,
        s."distributorId",
        u.name AS distributor_name,
        s.status,
        s."openedAt",
        s."closedAt",
        s."closedByAdminId",
        admin.name AS closed_by_admin,
        s.notes,
        s."snapshotData"
      FROM "DistributionSession" s
      JOIN "User" u ON u.id = s."distributorId"
      LEFT JOIN "User" admin ON admin.id = s."closedByAdminId"
      WHERE 1=1
    `;
    const params = [];
    if (sessionFilter) {
      params.push(sessionFilter);
      sessionsQuery += ` AND s.id = $${params.length}`;
    }
    if (distributorFilter) {
      params.push(`%${distributorFilter}%`);
      sessionsQuery += ` AND LOWER(u.name) LIKE $${params.length}`;
    }
    sessionsQuery += ` ORDER BY s.id DESC`;

    const sessionsRes = await client.query(sessionsQuery, params);
    const sessions = sessionsRes.rows;

    if (sessions.length === 0) {
      console.log('\n⚠️  No se encontraron sesiones de distribución con los filtros indicados.');
      return;
    }

    // ── RESUMEN GENERAL TABULAR DE TODAS LAS JORNADAS ──
    console.log(`\n📋 TOTAL DE JORNADAS REGISTRADAS: ${sessions.length}`);
    console.log(line('─'));
    console.log(
      pad('#', 6) +
      pad('Distribuidor', 18) +
      pad('Estado', 10) +
      pad('Apertura', 20) +
      pad('Cierre', 20)
    );
    console.log(line('─'));

    for (const s of sessions) {
      console.log(
        pad(`#${s.id}`, 6) +
        pad(s.distributor_name, 18) +
        pad(s.status.toUpperCase(), 10) +
        pad(fmtDate(s.openedAt), 20) +
        pad(s.closedAt ? fmtDate(s.closedAt) : '🟢 EN CURSO', 20)
      );
    }
    console.log(line('─'));

    // ── DETALLE PROFUNDO JORNADA POR JORNADA ──
    for (const session of sessions) {
      const openedAt = new Date(session.openedAt);
      const closedAt = session.closedAt ? new Date(session.closedAt) : new Date();

      console.log('\n' + line('━'));
      console.log(` 🚚 JORNADA #${session.id} — DISTRIBUIDOR: ${session.distributor_name.toUpperCase()}`);
      console.log(`    Apertura: ${fmtDate(session.openedAt)}`);
      console.log(`    Cierre:   ${session.closedAt ? fmtDate(session.closedAt) : '🟢 Sesión actualmente activa'}`);
      if (session.closed_by_admin) {
        console.log(`    Cerrada por admin: ${session.closed_by_admin}`);
      }
      if (session.notes) {
        console.log(`    Notas de jornada: "${session.notes}"`);
      }
      console.log(line('━'));

      // 2. Buscar pedidos asignados o entregados en esta jornada
      // Estrategia:
      // A) Pedidos asignados a este distribuidor que se entregaron durante esta sesión (deliveredAt entre openedAt y closedAt)
      // B) Pedidos asignados a este distribuidor en este lapso (registrados en OrderHistory con action = 'assigned')
      // C) Si la sesión está activa, también pedidos actualmente en status 'asignado'
      const ordersInSessionQuery = `
        SELECT DISTINCT
          o.id,
          o.status,
          o.discount,
          o.notes,
          o."createdAt",
          o."deliveredAt",
          o."clientId",
          c.name AS client_name,
          c.address AS client_address,
          c.phone AS client_phone,
          prev.name AS preventista_name
        FROM "Order" o
        JOIN "Client" c ON c.id = o."clientId"
        JOIN "User" prev ON prev.id = o."preventistaId"
        LEFT JOIN "OrderHistory" h ON h."orderId" = o.id
        WHERE o."distributorId" = $1
          AND (
            -- Pedidos entregados en la jornada
            (o."deliveredAt" IS NOT NULL AND o."deliveredAt" >= $2 AND o."deliveredAt" <= $3)
            -- O pedidos asignados durante esta jornada según historial
            OR (h.action = 'assigned' AND h."createdAt" >= $2 AND h."createdAt" <= $3)
            -- O si está activa, pedidos que tiene asignados ahora
            OR ($4 = 'activa' AND o.status = 'asignado')
          )
        ORDER BY o.id ASC
      `;

      const ordersRes = await client.query(ordersInSessionQuery, [
        session.distributorId,
        openedAt,
        closedAt,
        session.status
      ]);
      const sessionOrders = ordersRes.rows;

      if (sessionOrders.length === 0) {
        console.log('   ⚠️  No se registraron pedidos asociados a esta jornada.');
        continue;
      }

      // Obtener los productos de estos pedidos
      const sOrderIds = sessionOrders.map(o => o.id);
      const itemsQuery = `
        SELECT 
          oi.id,
          oi."orderId",
          oi."productId",
          p.name AS product_name,
          p.unit AS product_unit,
          oi.quantity,
          oi."deliveredQuantity",
          oi."unitPrice",
          oi."isBonification"
        FROM "OrderItem" oi
        JOIN "Product" p ON p.id = oi."productId"
        WHERE oi."orderId" = ANY($1::int[])
        ORDER BY oi."orderId" ASC, oi.id ASC
      `;
      const itemsRes = await client.query(itemsQuery, [sOrderIds]);
      const itemsByOrder = new Map();
      itemsRes.rows.forEach(it => {
        if (!itemsByOrder.has(it.orderId)) itemsByOrder.set(it.orderId, []);
        itemsByOrder.get(it.orderId).push(it);
      });

      // ── LISTADO DE PEDIDOS DE ESTA JORNADA ──
      console.log(`\n   📦 PEDIDOS SUBIDOS AL CAMIÓN EN ESTA JORNADA (${sessionOrders.length} pedidos):`);
      console.log('   ' + line('─', 85));
      console.log(
        '   ' +
        pad('#', 6) +
        pad('Cliente', 24) +
        pad('Preventista', 14) +
        pad('Estado', 14) +
        pad('Bultos', 9, 'right') +
        pad('Subtotal', 10, 'right') +
        pad('Desc.', 8, 'right') +
        pad('Total', 10, 'right')
      );
      console.log('   ' + line('─', 85));

      let totalCobrarAsignado = 0;
      let totalDineroCobradoReal = 0;
      let totalDineroSistemaAntiguo = 0;
      let pedidosEntregados = 0;
      let pedidosPendientes = 0;
      let pedidosParciales = 0;

      const consolidadoCarga = new Map();

      for (const ord of sessionOrders) {
        const items = itemsByOrder.get(ord.id) || [];
        const isDelivered = ord.status === 'entregado' || ord.status === 'entrega_parcial';

        if (ord.status === 'entregado') pedidosEntregados++;
        else if (ord.status === 'entrega_parcial') pedidosParciales++;
        else pedidosPendientes++;

        const subtotal = items
          .filter(i => !i.isBonification)
          .reduce((s, i) => s + Number(i.unitPrice) * Number(i.quantity), 0);
        const discount = Number(ord.discount || 0);
        const neto = Math.max(0, subtotal - discount);
        totalCobrarAsignado += neto;

        const subtotalEntregado = items
          .filter(i => !i.isBonification)
          .reduce((s, i) => s + Number(i.unitPrice) * (i.deliveredQuantity ?? i.quantity), 0);
        const cobradoReal = isDelivered ? Math.max(0, subtotalEntregado - discount) : 0;
        totalDineroCobradoReal += cobradoReal;

        if (isDelivered) {
          totalDineroSistemaAntiguo += subtotalEntregado; // El bug antiguo no restaba el descuento
        }

        const orderBultos = items.reduce((s, i) => s + Number(i.quantity), 0);

        console.log(
          '   ' +
          pad(`#${ord.id}`, 6) +
          pad(ord.client_name, 24) +
          pad(ord.preventista_name, 14) +
          pad(ord.status, 14) +
          pad(`x${orderBultos}`, 9, 'right') +
          pad(money(subtotal), 10, 'right') +
          pad(discount > 0 ? `-${discount.toFixed(0)}` : '0', 8, 'right') +
          pad(money(neto), 10, 'right')
        );

        // Consolidar carga física de productos en el camión
        for (const it of items) {
          const name = it.product_name;
          if (!consolidadoCarga.has(name)) {
            consolidadoCarga.set(name, {
              name,
              unit: it.product_unit,
              unitPrice: Number(it.unitPrice),
              cargadoVenta: 0,
              cargadoBonif: 0,
              entregadoVenta: 0,
              entregadoBonif: 0,
              devueltoVenta: 0,
              devueltoBonif: 0
            });
          }
          const c = consolidadoCarga.get(name);
          const deliv = isDelivered ? (it.deliveredQuantity ?? it.quantity) : 0;
          const dev = isDelivered ? Math.max(0, it.quantity - deliv) : 0;

          if (it.isBonification) {
            c.cargadoBonif += Number(it.quantity);
            if (isDelivered) {
              c.entregadoBonif += deliv;
              c.devueltoBonif += dev;
            }
          } else {
            c.cargadoVenta += Number(it.quantity);
            if (isDelivered) {
              c.entregadoVenta += deliv;
              c.devueltoVenta += dev;
            }
          }
        }
      }

      console.log('   ' + line('─', 85));
      console.log(
        '   ' +
        pad(`TOTALES DE LA JORNADA (${sessionOrders.length} pedidos):`, 63) +
        pad(money(totalCobrarAsignado), 22, 'right')
      );

      // ── CONSOLIDADO DE PRODUCTOS CARGADOS AL CAMIÓN ──
      console.log(`\n   📦 TOTAL DE PRODUCTOS ASIGNADOS AL CAMIÓN EN ESTA JORNADA:`);
      console.log('   ' + line('─', 85));
      console.log(
        '   ' +
        pad('Producto', 28) +
        pad('Venta Reg.', 11, 'right') +
        pad('🎁 Bonif.', 11, 'right') +
        pad('TOTAL FÍSICO', 14, 'right') +
        pad('Entregado', 11, 'right') +
        pad('Devuelto', 10, 'right')
      );
      console.log('   ' + line('─', 85));

      let totalFisicoCargado = 0;
      let totalVentaCargada = 0;
      let totalBonifCargada = 0;
      let totalFisicoEntregado = 0;
      let totalFisicoDevuelto = 0;

      for (const [name, c] of consolidadoCarga.entries()) {
        const totalCarg = c.cargadoVenta + c.cargadoBonif;
        const totalEnt = c.entregadoVenta + c.entregadoBonif;
        const totalDev = c.devueltoVenta + c.devueltoBonif;

        totalVentaCargada += c.cargadoVenta;
        totalBonifCargada += c.cargadoBonif;
        totalFisicoCargado += totalCarg;
        totalFisicoEntregado += totalEnt;
        totalFisicoDevuelto += totalDev;

        console.log(
          '   ' +
          pad(name, 28) +
          pad(`x${c.cargadoVenta}`, 11, 'right') +
          pad(c.cargadoBonif > 0 ? `+${c.cargadoBonif}` : '-', 11, 'right') +
          pad(`x${totalCarg}`, 14, 'right') +
          pad(`x${totalEnt}`, 11, 'right') +
          pad(totalDev > 0 ? `x${totalDev} ⚠️` : '0', 10, 'right')
        );
      }

      console.log('   ' + line('─', 85));
      console.log(
        '   ' +
        pad('TOTAL UNIDADES FÍSICAS:', 28) +
        pad(`x${totalVentaCargada}`, 11, 'right') +
        pad(`+${totalBonifCargada}`, 11, 'right') +
        pad(`x${totalFisicoCargado}`, 14, 'right') +
        pad(`x${totalFisicoEntregado}`, 11, 'right') +
        pad(`x${totalFisicoDevuelto}`, 10, 'right')
      );

      // ── BALANCE ECONÓMICO Y COMPARATIVA ──
      console.log(`\n   💰 RESUMEN FINANCIERO DE LA JORNADA:`);
      console.log(`      • Pedidos: ${sessionOrders.length} (Completados: ${pedidosEntregados}, Parciales: ${pedidosParciales}, Pendientes: ${pedidosPendientes})`);
      console.log(`      • Total físico cargado:   ${totalFisicoCargado} unidades (${totalVentaCargada} venta + ${totalBonifCargada} bonificaciones)`);
      console.log(`      • Total físico entregado: ${totalFisicoEntregado} unidades`);
      console.log(`      • Total físico devuelto:  ${totalFisicoDevuelto} unidades (vuelven a bodega)`);
      console.log(`      • Importe neto asignado:  ${money(totalCobrarAsignado)}`);
      console.log(`      • Dinero cobrado real:    ${money(totalDineroCobradoReal)}`);

      const diferenciaBug = totalDineroSistemaAntiguo - totalDineroCobradoReal;
      if (diferenciaBug > 0) {
        console.log(`\n   🚨 COMPARATIVA FORENSE (DEMOSTRACIÓN DEL ERROR DEL SISTEMA ANTERIOR):`);
        console.log(`      • El sistema antiguo decía: ${money(totalDineroSistemaAntiguo)} (no restaba los descuentos concedidos por preventistas)`);
        console.log(`      • Lo que el distribuidor realmente cobró: ${money(totalDineroCobradoReal)}`);
        console.log(`      • Falsa diferencia / aparente faltante: -${money(diferenciaBug)}`);
        console.log(`      👉 CONCLUSIÓN: Al distribuidor NO le faltó dinero. El sistema antiguo tenía un bug que omitía restar los descuentos.`);
      } else {
        console.log(`      ✅ Dinero cuadrado sin discrepancias de descuento en esta jornada.`);
      }
    }

    console.log('\n' + line('═'));
    console.log(' ✅ AUDITORÍA DE TODAS LAS JORNADAS COMPLETADA');
    console.log(line('═') + '\n');

  } catch (err) {
    console.error('❌ Error ejecutando auditoría de jornadas:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

auditAllSessions();

