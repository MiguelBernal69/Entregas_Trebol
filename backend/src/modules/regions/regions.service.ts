import prisma from '../../prisma/client'
import pool from '../../config/db'

const geojsonToWKT = (coordinates: number[][][]): string => {
  const points = coordinates[0].map(p => `${p[0]} ${p[1]}`).join(', ')
  return `POLYGON((${points}))`
}

export const getAllRegions = async () => {
  const result = await pool.query(`
    SELECT 
      r.id, r.name, r.color, r."createdAt",
      u.name as "creatorName",
      ST_AsGeoJSON(r.polygon)::json as polygon
    FROM "Region" r
    LEFT JOIN "User" u ON u.id = r."createdBy"
    ORDER BY r."createdAt" DESC
  `)
  return result.rows
}

export const getRegionById = async (id: number) => {
  const result = await pool.query(`
    SELECT 
      r.id, r.name, r.color, r."createdAt",
      u.name as "creatorName",
      ST_AsGeoJSON(r.polygon)::json as polygon
    FROM "Region" r
    LEFT JOIN "User" u ON u.id = r."createdBy"
    WHERE r.id = $1
  `, [id])

  if (!result.rows.length) throw new Error('Región no encontrada')
  return result.rows[0]
}

export const createRegion = async (
  data: { name: string; color?: string; polygon: any },
  createdBy: number
) => {
  if (!data.polygon?.coordinates) throw new Error('Polígono GeoJSON inválido')

  const wkt = geojsonToWKT(data.polygon.coordinates)

  const region = await prisma.region.create({
    data: {
      name: data.name,
      color: data.color ?? '#3B82F6',
      createdBy
    }
  })

  await pool.query(
    `UPDATE "Region" SET polygon = ST_GeomFromText($1, 4326) WHERE id = $2`,
    [wkt, region.id]
  )

  // Asignar automáticamente la región a todos los clientes que caen dentro o sobre el borde del polígono
  await pool.query(`
    UPDATE "Client"
    SET "regionId" = $1
    WHERE ST_Intersects(
      (SELECT polygon FROM "Region" WHERE id = $1),
      ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)
    )
  `, [region.id])

  // Propagar también a pedidos activos de esos clientes
  await pool.query(`
    UPDATE "Order" o
    SET "regionId" = $1
    FROM "Client" c
    WHERE o."clientId" = c.id
      AND c."regionId" = $1
      AND o.status IN ('pendiente', 'aceptado', 'asignado')
  `, [region.id])

  return getRegionById(region.id)
}

export const updateRegion = async (
  id: number,
  data: { name?: string; color?: string; polygon?: any }
) => {
  const existing = await prisma.region.findUnique({ where: { id } })
  if (!existing) throw new Error('Región no encontrada')

  if (data.name || data.color) {
    await prisma.region.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.color && { color: data.color })
      }
    })
  }

  if (data.polygon?.coordinates) {
    const wkt = geojsonToWKT(data.polygon.coordinates)
    await pool.query(
      `UPDATE "Region" SET polygon = ST_GeomFromText($1, 4326) WHERE id = $2`,
      [wkt, id]
    )
    // Sincronizar clientes y pedidos al modificar el polígono de una zona
    await recalculateAllRegions()
  }

  return getRegionById(id)
}

export const deleteRegion = async (id: number) => {
  const existing = await prisma.region.findUnique({ where: { id } })
  if (!existing) throw new Error('Región no encontrada')

  // Limpiar regionId de clientes y pedidos activos que pertenecían a esta región
  await pool.query(
    `UPDATE "Order" SET "regionId" = NULL WHERE "regionId" = $1 AND status IN ('pendiente', 'aceptado', 'asignado')`,
    [id]
  )
  await prisma.client.updateMany({
    where: { regionId: id },
    data: { regionId: null }
  })

  await prisma.region.delete({ where: { id } })
  return { message: 'Región eliminada' }
}

export const getOrdersByRegion = async (id: number) => {
  const existing = await prisma.region.findUnique({ where: { id } })
  if (!existing) throw new Error('Región no encontrada')

  const result = await pool.query(`
    SELECT 
      o.id, o.status, o."createdAt", o.notes,
      c.name as "clientName", c.address,
      c.latitude, c.longitude,
      u.name as "preventistaName"
    FROM "Order" o
    JOIN "Client" c ON c.id = o."clientId"
    JOIN "User" u ON u.id = o."preventistaId"
    WHERE o."regionId" = $1
      AND o.status = 'aceptado'
    ORDER BY o."createdAt" DESC
  `, [id])

  return result.rows
}

export const getRegionByPoint = async (latitude: number, longitude: number) => {
  const result = await pool.query(`
    SELECT id, name, color
    FROM "Region"
    WHERE polygon IS NOT NULL
      AND ST_Intersects(
        polygon,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)
      )
    ORDER BY id DESC
    LIMIT 1
  `, [longitude, latitude])

  return result.rows[0] ?? null
}

export const recalculateAllRegions = async () => {
  // 1. Limpiar regionId de todos los clientes
  await pool.query(`UPDATE "Client" SET "regionId" = NULL`)

  // 2. Asignar la región correcta a cada cliente según su ubicación (PostGIS)
  // Usamos ST_Intersects para incluir bordes y subconsulta con DISTINCT ON para unicidad determinante
  await pool.query(`
    UPDATE "Client" c
    SET "regionId" = sub."regionId"
    FROM (
      SELECT DISTINCT ON (c2.id) c2.id as client_id, r.id as "regionId"
      FROM "Client" c2
      JOIN "Region" r ON r.polygon IS NOT NULL
        AND ST_Intersects(
          r.polygon,
          ST_SetSRID(ST_MakePoint(c2.longitude, c2.latitude), 4326)
        )
      ORDER BY c2.id, r.id DESC
    ) sub
    WHERE c.id = sub.client_id
  `)

  // 3. Contar clientes actualizados
  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM "Client" WHERE "regionId" IS NOT NULL`
  )

  // 4. Propagar regionId a pedidos activos de cada cliente (incluyendo poner a NULL los que quedaron sin zona)
  await pool.query(`
    UPDATE "Order" o
    SET "regionId" = c."regionId"
    FROM "Client" c
    WHERE o."clientId" = c.id
      AND o.status IN ('pendiente', 'aceptado', 'asignado')
  `)

  const ordersResult = await pool.query(
    `SELECT COUNT(*) as total FROM "Order" WHERE "regionId" IS NOT NULL AND status IN ('pendiente', 'aceptado', 'asignado')`
  )

  return {
    clientesAsignados: Number(countResult.rows[0].total),
    pedidosActualizados: Number(ordersResult.rows[0].total)
  }
}

export const assignRegionToUser = async (userId: number, regionId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user || user.role !== 'preventista') throw new Error('Usuario no válido')

  const region = await prisma.region.findUnique({ where: { id: regionId } })
  if (!region) throw new Error('Región no encontrada')

  return prisma.userRegion.upsert({
    where: { userId_regionId: { userId, regionId } },
    create: { userId, regionId },
    update: {}
  })
}

export const removeRegionFromUser = async (userId: number, regionId: number) => {
  return prisma.userRegion.deleteMany({ where: { userId, regionId } })
}

export const getPreventistasInRegion = async (regionId: number) => {
  return prisma.userRegion.findMany({
    where: { regionId },
    include: { user: { select: { id: true, name: true, email: true, phone: true } } }
  })
}

export const getUserRegions = async (userId: number) => {
  return prisma.userRegion.findMany({
    where: { userId },
    include: { region: { select: { id: true, name: true, color: true } } }
  })
}

export const assignRegionsBulk = async (userId: number, regionIds: number[]) => {
  return prisma.$transaction(async (tx) => {
    // 1. Delete all existing assignments for this user
    await tx.userRegion.deleteMany({ where: { userId } })
    
    // 2. Create new assignments
    if (regionIds.length > 0) {
      await tx.userRegion.createMany({
        data: regionIds.map(id => ({ userId, regionId: id }))
      })
    }
    
    return { count: regionIds.length }
  })
}
