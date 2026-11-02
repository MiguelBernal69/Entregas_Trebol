/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regionId` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `distributorId` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regionId` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OrderHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OrderHistory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `OrderItem` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Region` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Region` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `createdBy` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `clientId` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `preventistaId` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orderId` on the `OrderHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `changedBy` on the `OrderHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `orderId` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `productId` on the `OrderItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdBy` on the `Region` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_distributorId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_preventistaId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_regionId_fkey";

-- DropForeignKey
ALTER TABLE "OrderHistory" DROP CONSTRAINT "OrderHistory_changedBy_fkey";

-- DropForeignKey
ALTER TABLE "OrderHistory" DROP CONSTRAINT "OrderHistory_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_createdBy_fkey";

-- AlterTable
ALTER TABLE "Client" DROP CONSTRAINT "Client_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "regionId",
ADD COLUMN     "regionId" INTEGER,
DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD CONSTRAINT "Client_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "clientId",
ADD COLUMN     "clientId" INTEGER NOT NULL,
DROP COLUMN "preventistaId",
ADD COLUMN     "preventistaId" INTEGER NOT NULL,
DROP COLUMN "distributorId",
ADD COLUMN     "distributorId" INTEGER,
DROP COLUMN "regionId",
ADD COLUMN     "regionId" INTEGER,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrderHistory" DROP CONSTRAINT "OrderHistory_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "orderId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
DROP COLUMN "changedBy",
ADD COLUMN     "changedBy" INTEGER NOT NULL,
ADD CONSTRAINT "OrderHistory_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "orderId",
ADD COLUMN     "orderId" INTEGER NOT NULL,
DROP COLUMN "productId",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Region" DROP CONSTRAINT "Region_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_preventistaId_fkey" FOREIGN KEY ("preventistaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_distributorId_fkey" FOREIGN KEY ("distributorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderHistory" ADD CONSTRAINT "OrderHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderHistory" ADD CONSTRAINT "OrderHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
