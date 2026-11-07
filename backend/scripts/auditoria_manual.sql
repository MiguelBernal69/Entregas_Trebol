-- =============================================================================
-- CONSULTAS SQL DE AUDITORÍA FORENSE - Distribuidora Trébol
-- Puedes ejecutar estas consultas en pgAdmin, DBeaver o en el VPS con psql.
-- Cambia '2026-11-06' por la fecha que desees revisar.
-- =============================================================================

-- [1] LISTA DE TODOS LOS PEDIDOS DEL DÍA Y SU ESTADO DE ASIGNACIÓN
-- Permite ver qué pidió el preventista y si se cargó o no a un distribuidor
SELECT 
    o.id AS pedido_id,
    to_char(o."createdAt" AT TIME ZONE 'America/La_Paz', 'HH24:MI:SS') AS hora_creado,
    prev.name AS preventista,
    c.name AS cliente,
    COALESCE(dist.name, '⚠️ NO SE CARGÓ A NINGÚN CAMIÓN') AS distribuidor_asignado,
    o.status AS estado_pedido,
    o.discount AS descuento_bs,
    -- Subtotal bruto antes de descuento
    COALESCE(SUM(CASE WHEN oi."isBonification" = false THEN oi.quantity * oi."unitPrice" ELSE 0 END), 0) AS subtotal_bruto,
    -- Total neto real
    GREATEST(0, COALESCE(SUM(CASE WHEN oi."isBonification" = false THEN oi.quantity * oi."unitPrice" ELSE 0 END), 0) - o.discount) AS total_neto_real,
    -- Total bultos físicos
    SUM(oi.quantity) AS total_unidades_fisicas,
    SUM(CASE WHEN oi."isBonification" = true THEN oi.quantity ELSE 0 END) AS unidades_bonificacion
FROM "Order" o
JOIN "Client" c ON c.id = o."clientId"
JOIN "User" prev ON prev.id = o."preventistaId"
LEFT JOIN "User" dist ON dist.id = o."distributorId"
LEFT JOIN "OrderItem" oi ON oi."orderId" = o.id
WHERE o."createdAt" >= '2026-11-06 00:00:00-04' AND o."createdAt" <= '2026-11-06 23:59:59-04'
GROUP BY o.id, o."createdAt", prev.name, c.name, dist.name, o.status, o.discount
ORDER BY o.id ASC;


-- [2] PEDIDOS QUE QUEDARON SIN CARGAR (OLVIDADOS EN BODEGA)
-- Si el cliente reclama que el preventista le tomó pedido pero nunca llegó el camión:
SELECT 
    o.id AS pedido_olvidado_id,
    prev.name AS preventista,
    c.name AS cliente,
    c.phone AS telefono_cliente,
    o.status AS estado_actual,
    o."createdAt" AT TIME ZONE 'America/La_Paz' AS fecha_hora_pedido
FROM "Order" o
JOIN "Client" c ON c.id = o."clientId"
JOIN "User" prev ON prev.id = o."preventistaId"
WHERE o."createdAt" >= '2026-11-06 00:00:00-04' AND o."createdAt" <= '2026-11-06 23:59:59-04'
  AND (o."distributorId" IS NULL OR o.status = 'aceptado');


-- [3] CONSOLIDADO FÍSICO DE LO SOLICITADO VS LO ASIGNADO A CAMIÓN
-- Muestra si se cargó todo o si faltó subir algún producto al camión
SELECT 
    p.name AS producto,
    -- Total pedido por el preventista
    SUM(CASE WHEN oi."isBonification" = false THEN oi.quantity ELSE 0 END) AS pedido_para_venta,
    SUM(CASE WHEN oi."isBonification" = true THEN oi.quantity ELSE 0 END) AS pedido_como_bonif,
    SUM(oi.quantity) AS total_fisico_pedido,
    -- Total que realmente se asignó a algún distribuidor
    SUM(CASE WHEN o."distributorId" IS NOT NULL THEN oi.quantity ELSE 0 END) AS total_fisico_en_camiones,
    -- Diferencia: productos que quedaron sin camión
    SUM(CASE WHEN o."distributorId" IS NULL THEN oi.quantity ELSE 0 END) AS faltante_por_asignar
FROM "Order" o
JOIN "OrderItem" oi ON oi."orderId" = o.id
JOIN "Product" p ON p.id = oi."productId"
WHERE o."createdAt" >= '2026-11-06 00:00:00-04' AND o."createdAt" <= '2026-11-06 23:59:59-04'
GROUP BY p.name
ORDER BY p.name ASC;


-- [4] DEMOSTRACIÓN DE LA FALLA DEL SISTEMA ANTERIOR (DESCUADRE DE DINERO)
-- Esta consulta demuestra matemáticamente si hubo error en el sistema antiguo:
-- Compara lo que el sistema antiguo sumaba (sin descontar descuentos) vs lo que el chofer cobró en realidad
SELECT 
    dist.name AS distribuidor,
    COUNT(DISTINCT o.id) AS total_pedidos_entregados,
    -- Lo que el sistema ANTIGUO reportaba (sumaba todo sin restar o.discount)
    ROUND(SUM(CASE WHEN oi."isBonification" = false THEN (COALESCE(oi."deliveredQuantity", oi.quantity) * oi."unitPrice") ELSE 0 END)::numeric, 2) AS dinero_que_decia_sistema_antiguo,
    -- Total descuentos de los pedidos entregados
    SUM(DISTINCT o.discount) AS total_descuentos_aplicados,
    -- Lo que el chofer REALMENTE cobró
    ROUND((SUM(CASE WHEN oi."isBonification" = false THEN (COALESCE(oi."deliveredQuantity", oi.quantity) * oi."unitPrice") ELSE 0 END) - SUM(DISTINCT o.discount))::numeric, 2) AS dinero_real_cobrado,
    -- Discrepancia exacta generada por el bug del software
    SUM(DISTINCT o.discount) AS diferencia_generada_por_falla_del_sistema
FROM "Order" o
JOIN "User" dist ON dist.id = o."distributorId"
JOIN "OrderItem" oi ON oi."orderId" = o.id
WHERE o."createdAt" >= '2026-11-06 00:00:00-04' AND o."createdAt" <= '2026-11-06 23:59:59-04'
  AND o.status IN ('entregado', 'entrega_parcial')
GROUP BY dist.name;

