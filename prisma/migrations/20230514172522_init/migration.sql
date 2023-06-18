/*
  Warnings:

  - You are about to drop the column `Deskripsi_Produk` on the `kategori` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `kategori` DROP COLUMN `Deskripsi_Produk`,
    ADD COLUMN `Deskripsi_Kategori` VARCHAR(191) NULL;
