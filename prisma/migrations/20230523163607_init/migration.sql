/*
  Warnings:

  - You are about to drop the column `SaizProduk` on the `produk` table. All the data in the column will be lost.
  - You are about to drop the `saizkuantiti` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `produk_SaizProduk_fkey`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `SaizProduk`,
    ADD COLUMN `Kuantiti_Produk` VARCHAR(191) NULL,
    ADD COLUMN `Saiz_Produk` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `saizkuantiti`;
