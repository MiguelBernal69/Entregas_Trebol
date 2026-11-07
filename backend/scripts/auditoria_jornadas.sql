-- =============================================================================
-- CONSULTAS SQL DE AUDITORÍA: TODAS LAS JORNADAS Y CARGAS A DISTRIBUIDORES
-- Distribuidora Trébol
-- =============================================================================

-- [1] RESUMEN DE TODAS LAS JORNADAS (SESIONES) INICIADAS
-- Lista cada jornada, su chofer, horarios y estado
SELECT 
    s.id AS jornada_id,
    u.name AS distribuidor,
    s.status AS estado_jornada,
    s."openedAt" AT TIME ZONE 'America/La_Paz' AS apertura,
    s."closedAt" AT TIME ZONE 'America/La_Paz' AS cierre,
    admin.name AS cerrado_por_admin,
    s.notes AS notas
FROM "DistributionSession" s
JOIN "User" u ON u.id = s."distributorId"
LEFT JOIN "User" admin ON admin.id = s."closedByAdminId"
ORDER BY s.id DESC;


-- [2] PEDIDOS ASIGNADOS A CADA JORNADA / DISTRIBUIDOR
-- Reemplaza 's.id = 1' o quita el filtro para ver todos los pedidos de todas las jornadas
SELECT 
    s.id AS jornada_id,
    u.name AS distribuidor,
    o.id AS pedido_id,
    c.name AS cliente,
    prev.name AS preventista,
    o.status AS estado_pedido,
    o.discount AS descuento_bs,
    -- Total bultos del pedido
    SUM(oi.quantity) AS total_unidades_en_pedido,
    SUM(CASE WHEN oi."isBonification" = true THEN oi.quantity ELSE 0 END) AS unidades_bonif,
    -- Importe neto
    GREATEST(0, SUM(CASE WHEN oi."isBonification" = false THEN oi.quantity * oi."unitPrice" ELSE 0 END) - o.discount) AS total_a_cobrar_neto
FROM "DistributionSession" s
JOIN "User" u ON u.id = s."distributorId"
JOIN "Order" o ON o."distributorId" = s."distributorId"
JOIN "Client" c ON c.id = o."clientId"
JOIN "User" prev ON prev.id = o."preventistaId"
JOIN "OrderItem" oi ON oi."orderId" = o.id
WHERE (
    -- Entregados dentro del horario de la jornada
    (o."deliveredAt" IS NOT NULL AND o."deliveredAt" >= s."openedAt" AND o."deliveredAt" <= COALESCE(s."closedAt", NOW()))
    OR (s.status = 'activa' AND o.status = 'asignado')
)
GROUP BY s.id, u.name, o.id, c.name, prev.name, o.status, o.discount
ORDER BY s.id DESC, o.id ASC;


-- [3] CONSOLIDADO TOTAL DE PRODUCTOS CARGADOS AL CAMIÓN POR CADA JORNADA
-- Muestra exactamente cuánto de cada producto subió al camión en cada jornada
SELECT 
    s.id AS jornada_id,
    u.name AS distribuidor,
    p.name AS producto,
    -- Bultos para venta regular
    SUM(CASE WHEN oi."isBonification" = false THEN oi.quantity ELSE 0 END) AS unidades_para_venta,
    -- Bultos de regalo/bonificación
    SUM(CASE WHEN oi."isBonification" = true THEN oi.quantity ELSE 0 END) AS unidades_bonificacion,
    -- TOTAL FÍSICO QUE DEBIÓ SUBIR AL CAMIÓN
    SUM(oi.quantity) AS total_fisico_cargado_al_camion,
    -- Bultos entregados al cliente
    SUM(COALESCE(oi."deliveredQuantity", CASE WHEN o.status IN ('entregado', 'entrega_parcial') THEN oi.quantity ELSE 0 END)) AS total_entregado,
    -- Bultos devueltos al camión
    SUM(CASE WHEN o.status IN ('entregado', 'entrega_parcial') THEN (oi.quantity - COALESCE(oi."deliveredQuantity", oi.quantity)) ELSE 0 END) AS total_devuelto_al_camion
FROM "DistributionSession" s
JOIN "User" u ON u.id = s."distributorId"
JOIN "Order" o ON o."distributorId" = s."distributorId"
JOIN "OrderItem" oi ON oi."orderId" = o.id
JOIN "Product" p ON p.id = oi."productId"
WHERE (
    (o."deliveredAt" IS NOT NULL AND o."deliveredAt" >= s."openedAt" AND o."deliveredAt" <= COALESCE(s."closedAt", NOW()))
    OR (s.status = 'activa' AND o.status = 'asignado')
)
GROUP BY s.id, u.name, p.name
ORDER BY s.id DESC, p.name ASC;

