/**
 * SCRIPT DE AUDITORÍA FORENSE - Distribuidora Trébol
 * 
 * Uso:
 *   node scripts/audit_jornada.js [FECHA] [DISTRIBUIDOR]
 * 
 * Ejemplos:
 *   node scripts/audit_jornada.js                     # Audita hoy
 *   node scripts/audit_jornada.js 2026-11-06          # Audita el 6 de noviembre
 *   node scripts/audit_jornada.js 2026-11-06 Juan     # Audita a Juan el 6 de noviembre
 */

const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const args = process.argv.slice(2);
const targetDateStr = args[0] || new Date().toISOString().split('T')[0];
const targetDistributorFilter = args[1] ? args[1].toLowerCase() : null;

// Rango de fechas con zona horaria de Bolivia (-04:00)
const startOfDay = new Date(`${targetDateStr}T00:00:00.000-04:00`);
const endOfDay = new Date(`${targetDateStr}T23:59:59.999-04:00`);

const line = (char = '─', len = 75) => char.repeat(len);
const pad = (str, len, align = 'left') => {
  const s = String(str ?? '');
  if (s.length >= len) return s.substring(0, len);
  return align === 'right' ? s.padStart(len) : s.padEnd(len);
};
const money = (val) => `Bs. ${Number(val || 0).toFixed(2)}`;

async function runAudit() {
  const client = await pool.connect();
  try {
    console.log('\n' + line('═'));
    console.log(` 🔍 AUDITORÍA DE JORNADA Y CARGA — DISTRIBUIDORA TRÉBOL`);
    console.log(`    Fecha a auditar: ${targetDateStr}`);
    console.log(`    Rango: ${startOfDay.toISOString()} ── ${endOfDay.toISOString()}`);
    if (targetDistributorFilter) {
      console.log(`    Filtro de distribuidor: "${targetDistributorFilter}"`);
    }
    console.log(line('═'));

    // 1. Obtener todos los pedidos creados en la fecha
    const ordersQuery = `
      SELECT 
        o.id,
        o.status,
        o.discount,
        o.notes,
        o."createdAt",
        o."deliveredAt",
        o."clientId",
        c.name AS client_name,
        o."preventistaId",
        prev.name AS preventista_name,
        o."distributorId",
        dist.name AS distributor_name
      FROM "Order" o
      JOIN "Client" c ON c.id = o."clientId"
      JOIN "User" prev ON prev.id = o."preventistaId"
      LEFT JOIN "User" dist ON dist.id = o."distributorId"
      WHERE o."createdAt" >= $1 AND o."createdAt" <= $2
      ORDER BY o.id ASC
    `;
    const ordersRes = await client.query(ordersQuery, [startOfDay, endOfDay]);
    const orders = ordersRes.rows;

    if (orders.length === 0) {
      console.log(`\n⚠️  No se encontraron pedidos creados en la fecha ${targetDateStr}.`);
      console.log('   Si los pedidos fueron creados en otra fecha pero entregados hoy, verifica la fecha de creación.');
      return;
    }

    // 2. Obtener todos los items de esos pedidos
    const orderIds = orders.map(o => o.id);
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
    const itemsRes = await client.query(itemsQuery, [orderIds]);
    const itemsByOrder = new Map();
    itemsRes.rows.forEach(item => {
      if (!itemsByOrder.has(item.orderId)) itemsByOrder.set(item.orderId, []);
      itemsByOrder.get(item.orderId).push(item);
    });

    // ── SECCIÓN 1: DETALLE DE PEDIDOS DEL PREVENTISTA ──
    console.log(`\n📋 [1] PEDIDOS SOLICITADOS POR EL PREVENTISTA (${orders.length} pedidos)`);
    console.log(line('─'));
    console.log(
      pad('#', 6) +
      pad('Cliente', 22) +
      pad('Preventista', 14) +
      pad('Distribuidor', 14) +
      pad('Estado', 12) +
      pad('Subtotal', 11, 'right') +
      pad('Desc.', 9, 'right') +
      pad('Total', 11, 'right')
    );
    console.log(line('─'));

    let totalGlobalVenta = 0;
    let totalGlobalDescuento = 0;
    let totalGlobalNeto = 0;
    let totalBultosVenta = 0;
    let totalBultosBonif = 0;

    const pedidosNoAsignados = [];
    const pedidosPorDistribuidor = new Map();

    for (const o of orders) {
      const items = itemsByOrder.get(o.id) || [];
      const subtotal = items
        .filter(i => !i.isBonification)
        .reduce((sum, i) => sum + Number(i.unitPrice) * Number(i.quantity), 0);
      const discount = Number(o.discount || 0);
      const total = Math.max(0, subtotal - discount);

      totalGlobalVenta += subtotal;
      totalGlobalDescuento += discount;
      totalGlobalNeto += total;

      const regularQty = items.filter(i => !i.isBonification).reduce((s, i) => s + i.quantity, 0);
      const bonifQty = items.filter(i => i.isBonification).reduce((s, i) => s + i.quantity, 0);
      totalBultosVenta += regularQty;
      totalBultosBonif += bonifQty;

      const distName = o.distributor_name || '⚠️ SIN CARGAR';
      if (!o.distributorId) {
        pedidosNoAsignados.push(o);
      } else {
        if (!pedidosPorDistribuidor.has(o.distributor_name)) {
          pedidosPorDistribuidor.set(o.distributor_name, []);
        }
        pedidosPorDistribuidor.get(o.distributor_name).push({ ...o, items, subtotal, discount, total });
      }

      console.log(
        pad(`#${o.id}`, 6) +
        pad(o.client_name, 22) +
        pad(o.preventista_name, 14) +
        pad(distName, 14) +
        pad(o.status, 12) +
        pad(money(subtotal), 11, 'right') +
        pad(discount > 0 ? `-${money(discount)}` : '0.00', 9, 'right') +
        pad(money(total), 11, 'right')
      );
    }

    console.log(line('─'));
    console.log(
      pad('TOTALES PREVENTA:', 68) +
      pad(money(totalGlobalNeto), 11, 'right')
    );
    console.log(`   📦 Unidades de venta: ${totalBultosVenta}`);
    console.log(`   🎁 Unidades de bonificación: ${totalBultosBonif}`);
    console.log(`   📦 Total físico solicitado: ${totalBultosVenta + totalBultosBonif} unidades`);
    console.log(`   🏷️  Total descuentos preventista: -${money(totalGlobalDescuento)}`);

    if (pedidosNoAsignados.length > 0) {
      console.log(`\n⚠️  ¡ALERTA! Hay ${pedidosNoAsignados.length} pedidos que NUNCA fueron cargados a ningún camión:`);
      pedidosNoAsignados.forEach(p => {
        console.log(`   - Pedido #${p.id} (${p.client_name}) - Estado: ${p.status}`);
      });
    }

    // ── SECCIÓN 2: CONSOLIDADO DE PRODUCTOS A CARGAR ──
    console.log(`\n📦 [2] CONSOLIDADO GENERAL DE PRODUCTOS SOLICITADOS`);
    console.log(line('─'));
    console.log(
      pad('Producto', 32) +
      pad('P. Venta', 10, 'right') +
      pad('🎁 Bonif.', 10, 'right') +
      pad('Total Físico', 13, 'right') +
      pad('Importe Venta', 15, 'right')
    );
    console.log(line('─'));

    const consolidadoProductos = new Map();
    itemsRes.rows.forEach(it => {
      const name = it.product_name;
      if (!consolidadoProductos.has(name)) {
        consolidadoProductos.set(name, {
          name,
          unit: it.product_unit,
          unitPrice: Number(it.unitPrice),
          venta: 0,
          bonif: 0,
          importe: 0
        });
      }
      const p = consolidadoProductos.get(name);
      if (it.isBonification) {
        p.bonif += Number(it.quantity);
      } else {
        p.venta += Number(it.quantity);
        p.importe += Number(it.quantity) * Number(it.unitPrice);
      }
    });

    for (const [name, p] of consolidadoProductos.entries()) {
      console.log(
        pad(name, 32) +
        pad(`x${p.venta}`, 10, 'right') +
        pad(p.bonif > 0 ? `+${p.bonif}` : '-', 10, 'right') +
        pad(`x${p.venta + p.bonif}`, 13, 'right') +
        pad(money(p.importe), 15, 'right')
      );
    }
    console.log(line('─'));

    // ── SECCIÓN 3: AUDITORÍA POR DISTRIBUIDOR (CARGA vs ENTREGA) ──
    console.log(`\n🚛 [3] AUDITORÍA DETALLADA POR CAMIÓN / DISTRIBUIDOR`);

    for (const [distName, dOrders] of pedidosPorDistribuidor.entries()) {
      if (targetDistributorFilter && !distName.toLowerCase().includes(targetDistributorFilter)) {
        continue;
      }

      console.log('\n' + line('━'));
      console.log(` 🚚 CAMIÓN DE: ${distName.toUpperCase()} (${dOrders.length} pedidos asignados)`);
      console.log(line('━'));

      // Buscar si el distribuidor abrió sesión ese día
      const sessionQuery = `
        SELECT id, status, "openedAt", "closedAt", notes, "snapshotData"
        FROM "DistributionSession"
        WHERE "distributorId" = $1 AND "openedAt"::date = $2::date
        ORDER BY id DESC LIMIT 1
      `;
      const sessionRes = await client.query(sessionQuery, [dOrders[0].distributorId, targetDateStr]);
      const session = sessionRes.rows[0];

      if (session) {
        console.log(`   📌 Sesión #${session.id} — Estado: ${session.status.toUpperCase()}`);
        console.log(`      Apertura: ${new Date(session.openedAt).toLocaleTimeString()}`);
        console.log(`      Cierre:   ${session.closedAt ? new Date(session.closedAt).toLocaleTimeString() : 'En curso / Abierta'}`);
      } else {
        console.log(`   ℹ️  Sin registro de apertura de sesión formal en la fecha`);
      }

      // Detalle de carga física de este camión
      const cargaCamion = new Map();
      let totalCobrarCamion = 0;
      let totalRecaudadoCamion = 0;
      let totalRecaudadoSistemaAntiguo = 0; // Sin restar descuentos (el bug)

      let totalCargadoVenta = 0;
      let totalCargadoBonif = 0;
      let totalEntregadoVenta = 0;
      let totalEntregadoBonif = 0;
      let totalDevueltoVenta = 0;
      let totalDevueltoBonif = 0;

      for (const ord of dOrders) {
        totalCobrarCamion += ord.total;

        const isDelivered = ord.status === 'entregado' || ord.status === 'entrega_parcial';
        
        // Lo que realmente cobró
        const subtotalEntregado = ord.items
          .filter(i => !i.isBonification)
          .reduce((s, i) => s + Number(i.unitPrice) * (i.deliveredQuantity ?? i.quantity), 0);
        const netoCobrado = isDelivered ? Math.max(0, subtotalEntregado - ord.discount) : 0;
        totalRecaudadoCamion += netoCobrado;

        // Lo que el bug anterior sumaba
        if (isDelivered) {
          totalRecaudadoSistemaAntiguo += subtotalEntregado; // <- El bug no restaba ord.discount
        }

        for (const it of ord.items) {
          const name = it.product_name;
          if (!cargaCamion.has(name)) {
            cargaCamion.set(name, {
              name,
              cargadoVenta: 0,
              cargadoBonif: 0,
              entregadoVenta: 0,
              entregadoBonif: 0,
              devueltoVenta: 0,
              devueltoBonif: 0,
            });
          }
          const c = cargaCamion.get(name);
          const deliv = isDelivered ? (it.deliveredQuantity ?? it.quantity) : 0;
          const dev = isDelivered ? (it.quantity - deliv) : 0;

          if (it.isBonification) {
            c.cargadoBonif += it.quantity;
            totalCargadoBonif += it.quantity;
            if (isDelivered) {
              c.entregadoBonif += deliv;
              c.devueltoBonif += dev;
              totalEntregadoBonif += deliv;
              totalDevueltoBonif += dev;
            }
          } else {
            c.cargadoVenta += it.quantity;
            totalCargadoVenta += it.quantity;
            if (isDelivered) {
              c.entregadoVenta += deliv;
              c.devueltoVenta += dev;
              totalEntregadoVenta += deliv;
              totalDevueltoVenta += dev;
            }
          }
        }
      }

      console.log(`\n   📦 BALANCE FÍSICO DEL CAMIÓN:`);
      console.log(
        pad('   Producto', 30) +
        pad('Carga Venta', 12, 'right') +
        pad('Carga Bonif', 12, 'right') +
        pad('Total Cargado', 14, 'right') +
        pad('Entregado', 11, 'right') +
        pad('Devuelto', 10, 'right')
      );
      console.log('   ' + line('─', 88));

      for (const [name, c] of cargaCamion.entries()) {
        const totalCarg = c.cargadoVenta + c.cargadoBonif;
        const totalEnt = c.entregadoVenta + c.entregadoBonif;
        const totalDev = c.devueltoVenta + c.devueltoBonif;

        console.log(
          pad('   ' + name, 30) +
          pad(`x${c.cargadoVenta}`, 12, 'right') +
          pad(c.cargadoBonif > 0 ? `+${c.cargadoBonif}` : '-', 12, 'right') +
          pad(`x${totalCarg}`, 14, 'right') +
          pad(`x${totalEnt}`, 11, 'right') +
          pad(totalDev > 0 ? `x${totalDev} ⚠️` : '0', 10, 'right')
        );
      }
      console.log('   ' + line('─', 88));
      console.log(
        pad('   TOTALES:', 30) +
        pad(`x${totalCargadoVenta}`, 12, 'right') +
        pad(`+${totalCargadoBonif}`, 12, 'right') +
        pad(`x${totalCargadoVenta + totalCargadoBonif}`, 14, 'right') +
        pad(`x${totalEntregadoVenta + totalEntregadoBonif}`, 11, 'right') +
        pad(`x${totalDevueltoVenta + totalDevueltoBonif}`, 10, 'right')
      );

      console.log(`\n   💰 BALANCE ECONÓMICO DEL CAMIÓN:`);
      console.log(`      Total neto a cobrar asignado:  ${money(totalCobrarCamion)}`);
      console.log(`      Dinero REAL cobrado en ruta:   ${money(totalRecaudadoCamion)}`);
      
      const discrepancia = totalRecaudadoSistemaAntiguo - totalRecaudadoCamion;
      if (discrepancia > 0) {
        console.log(`\n   🚨 DEMOSTRACIÓN DEL ERROR DEL SISTEMA ANTERIOR:`);
        console.log(`      • El sistema antiguo mostraba:  ${money(totalRecaudadoSistemaAntiguo)} (porque NO restaba los descuentos)`);
        console.log(`      • Lo que el chofer realmente cobró: ${money(totalRecaudadoCamion)}`);
        console.log(`      • Falsa diferencia que generaba reclamo: -${money(discrepancia)}`);
        console.log(`      👉 ¡ESTO DEMUESTRA QUE AL DISTRIBUIDOR NO LE FALTÓ DINERO, FUE EL SISTEMA QUE NO RESTÓ LOS DESCUENTOS!`);
      } else {
        console.log(`      ✅ Sin discrepancias por descuentos en este camión.`);
      }
    }

    console.log('\n' + line('═'));
    console.log(` ✅ AUDITORÍA COMPLETADA`);
    console.log(line('═') + '\n');

  } catch (err) {
    console.error('❌ Error ejecutando auditoría:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runAudit();

