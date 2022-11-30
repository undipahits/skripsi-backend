/*
  Warnings:

  - You are about to alter the column `grossAmount` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `price` on the `Package` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `Order` MODIFY `grossAmount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Package` MODIFY `price` DECIMAL(10, 2) NOT NULL;
