-- La base nueva no necesita clasificación de productos.
ALTER TABLE "Product" DROP COLUMN IF EXISTS "category";
