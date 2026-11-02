-- ================================================
-- MIGRACIÓN SEGURA - Entregas Papas
-- Aplicar en la base de datos de PRODUCCIÓN
-- 
-- Todos los campos tienen DEFAULT → los datos
-- existentes NO se borran ni se alteran.
-- Ejecutar con: psql -U postgres -d bd_entregas -f migration_produccion.sql
-- ================================================

-- 1. Agregar campo category a Product (si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='Product' AND column_name='category'
  ) THEN
    ALTER TABLE "Product" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Categoría A';
    RAISE NOTICE '✅ Columna Product.category agregada';
  ELSE
    RAISE NOTICE '⏩ Columna Product.category ya existe, saltando';
  END IF;
END $$;

-- 2. Agregar campo discount a Order (si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='Order' AND column_name='discount'
  ) THEN
    ALTER TABLE "Order" ADD COLUMN "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;
    RAISE NOTICE '✅ Columna Order.discount agregada';
  ELSE
    RAISE NOTICE '⏩ Columna Order.discount ya existe, saltando';
  END IF;
END $$;

-- 3. Agregar campo isBonification a OrderItem (si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='OrderItem' AND column_name='isBonification'
  ) THEN
    ALTER TABLE "OrderItem" ADD COLUMN "isBonification" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE '✅ Columna OrderItem.isBonification agregada';
  ELSE
    RAISE NOTICE '⏩ Columna OrderItem.isBonification ya existe, saltando';
  END IF;
END $$;

-- Verificar que todo quedó bien
SELECT
  table_name,
  column_name,
  data_type,
  column_default
FROM information_schema.columns
WHERE table_name IN ('Product', 'Order', 'OrderItem')
  AND column_name IN ('category', 'discount', 'isBonification')
ORDER BY table_name, column_name;

SELECT '✅ Migración completada exitosamente' as resultado;
