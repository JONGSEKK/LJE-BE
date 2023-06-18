/*
  Warnings:

  - The primary key for the `kategori` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `produk_kategoriProduk_fkey`;

-- AlterTable
ALTER TABLE `kategori` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_kategoriProduk_fkey` FOREIGN KEY (`kategoriProduk`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
