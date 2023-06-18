/*
  Warnings:

  - You are about to drop the column `NamaKategori` on the `produk` table. All the data in the column will be lost.
  - Added the required column `kategoriProduk` to the `produk` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `produk_NamaKategori_fkey`;

-- DropIndex
DROP INDEX `kategori_Nama_Kategori_key` ON `kategori`;

-- AlterTable
ALTER TABLE `produk` DROP COLUMN `NamaKategori`,
    ADD COLUMN `kategoriProduk` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_kategoriProduk_fkey` FOREIGN KEY (`kategoriProduk`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
