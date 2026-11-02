-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('activa', 'cerrada');

-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'entrega_parcial';

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "deliveredQuantity" INTEGER;

-- CreateTable
CREATE TABLE "DistributionSession" (
    "id" SERIAL NOT NULL,
    "distributorId" INTEGER NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'activa',
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "closedByAdminId" INTEGER,
    "notes" TEXT,
    "snapshotData" JSONB,

    CONSTRAINT "DistributionSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DistributionSession" ADD CONSTRAINT "DistributionSession_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DistributionSession" ADD CONSTRAINT "DistributionSession_closedByAdminId_fkey" FOREIGN KEY ("closedByAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
