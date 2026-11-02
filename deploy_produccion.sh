#!/bin/bash
# =============================================================================
# SCRIPT DE DESPLIEGUE A PRODUCCIÓN - Entregas Papas
# 
# Ejecutar en el SERVIDOR VPS por SSH:
#   chmod +x deploy_produccion.sh && bash deploy_produccion.sh
#
# Basado en README.md del proyecto:
#   Backend:  npm run build → node dist/app.js (con PM2)
#   Frontend: npm run build → dist/ (servido por Nginx)
#   Prisma:   prisma migrate deploy (seguro para producción)
# =============================================================================
set -e  # Detener si cualquier comando falla

# ===================== CONFIGURA ESTOS VALORES =====================
APP_DIR="/ruta/al/proyecto/Entregas_Papas"  # <- Ajustar ruta real
DB_NAME="bd_entregas"
DB_USER="postgres"
DB_HOST="localhost"
DB_PASS="TU_PASSWORD_POSTGRESQL"            # <- Ajustar contraseña real
BACKUP_DIR="$HOME/backups_bd"
PM2_BACKEND_NAME="backend"                  # <- Nombre en: pm2 list
# ==================================================================

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/bd_entregas_${TIMESTAMP}.dump"

echo ""
echo "========================================================"
echo "  DESPLIEGUE A PRODUCCIÓN - Entregas Papas"
echo "  $(date)"
echo "========================================================"

# ── PASO 1: Backup de base de datos ───────────────────────────────
echo ""
echo "📦 [1/7] Backup de base de datos..."
mkdir -p "$BACKUP_DIR"

PGPASSWORD="$DB_PASS" pg_dump \
  -h "$DB_HOST" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --format=custom \
  -f "$BACKUP_FILE"

echo "   ✅ Backup: $BACKUP_FILE ($(du -sh $BACKUP_FILE | cut -f1))"

# ── PASO 2: Git pull ───────────────────────────────────────────────
echo ""
echo "🔄 [2/7] Actualizando código..."
cd "$APP_DIR"
git fetch origin
git checkout miguel
git pull origin miguel
echo "   ✅ Commit: $(git log -1 --oneline)"

# ── PASO 3: Migración de base de datos (safe) ─────────────────────
echo ""
echo "🗄️  [3/7] Aplicando migración de base de datos..."
echo "   Columnas nuevas con DEFAULT → datos existentes NO se tocan"

PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" << 'MIGRATION_SQL'
-- Migración: add_bonification_discount_category
-- Usa IF NOT EXISTS → idempotente (seguro correr múltiples veces)

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Product' AND column_name='category') THEN
    ALTER TABLE "Product" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Categoría A';
    RAISE NOTICE '✅ Product.category agregado';
  ELSE
    RAISE NOTICE '⏩ Product.category ya existe';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Order' AND column_name='discount') THEN
    ALTER TABLE "Order" ADD COLUMN "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;
    RAISE NOTICE '✅ Order.discount agregado';
  ELSE
    RAISE NOTICE '⏩ Order.discount ya existe';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='OrderItem' AND column_name='isBonification') THEN
    ALTER TABLE "OrderItem" ADD COLUMN "isBonification" BOOLEAN NOT NULL DEFAULT false;
    RAISE NOTICE '✅ OrderItem.isBonification agregado';
  ELSE
    RAISE NOTICE '⏩ OrderItem.isBonification ya existe';
  END IF;
END $$;

SELECT 'Migración OK' AS resultado;
MIGRATION_SQL

echo "   ✅ Migración aplicada"

# ── PASO 4: Backend → npm install ─────────────────────────────────
echo ""
echo "📦 [4/7] Dependencias del backend..."
cd "$APP_DIR/backend"
npm install
echo "   ✅ npm install completado"

# ── PASO 5: Backend → Prisma generate + build TypeScript ──────────
echo ""
echo "⚙️  [5/7] Compilando backend..."
npm run prisma:generate    # Regenerar el cliente Prisma
npm run build              # tsc → compila a dist/
echo "   ✅ Backend compilado en dist/"

# ── PASO 6: Frontend → npm install + build ────────────────────────
echo ""
echo "🔨 [6/7] Compilando frontend..."
cd "$APP_DIR/frontend"
npm install
npm run build              # tsc -b && vite build → dist/
echo "   ✅ Frontend compilado en dist/"

# ── PASO 7: Reiniciar backend con PM2 ─────────────────────────────
echo ""
echo "🚀 [7/7] Reiniciando backend con PM2..."
cd "$APP_DIR/backend"
pm2 restart "$PM2_BACKEND_NAME" --update-env
pm2 save

echo ""
echo "========================================================"
echo "  ✅ DESPLIEGUE COMPLETADO EXITOSAMENTE"
echo "  Fecha: $(date)"
echo "  Commit: $(cd $APP_DIR && git log -1 --oneline)"
echo "  Backup: $BACKUP_FILE"
echo "========================================================"
echo ""
echo "  Estado PM2:"
pm2 list
echo ""
echo "  🔙 Para revertir si algo falla:"
echo "     PGPASSWORD=\$DB_PASS pg_restore -h $DB_HOST -U $DB_USER -d $DB_NAME -c -1 \"$BACKUP_FILE\""
echo "     cd $APP_DIR && git checkout HEAD~1"
echo "     pm2 restart $PM2_BACKEND_NAME"
echo ""
