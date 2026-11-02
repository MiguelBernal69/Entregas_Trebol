-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- AlterTable
ALTER TABLE "Region" ADD COLUMN     "polygon" geometry(Polygon, 4326);

-- CreateTable
CREATE TABLE "UserRegion" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRegion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRegion_userId_regionId_key" ON "UserRegion"("userId", "regionId");

-- AddForeignKey
ALTER TABLE "UserRegion" ADD CONSTRAINT "UserRegion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRegion" ADD CONSTRAINT "UserRegion_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
