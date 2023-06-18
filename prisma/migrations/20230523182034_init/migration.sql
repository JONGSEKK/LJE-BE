/*
  Warnings:

  - A unique constraint covering the columns `[Nama_Kategori]` on the table `kategori` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `produk` DROP FOREIGN KEY `produk_kategoriProduk_fkey`;

-- CreateIndex
CREATE UNIQUE INDEX `kategori_Nama_Kategori_key` ON `kategori`(`Nama_Kategori`);

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_kategoriProduk_fkey` FOREIGN KEY (`kategoriProduk`) REFERENCES `kategori`(`Nama_Kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;
