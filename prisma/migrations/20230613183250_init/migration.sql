/*
  Warnings:

  - You are about to drop the column `ProdukID` on the `notifikasi` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `notifikasi` DROP FOREIGN KEY `notifikasi_id_fkey`;

-- AlterTable
ALTER TABLE `notifikasi` DROP COLUMN `ProdukID`;
