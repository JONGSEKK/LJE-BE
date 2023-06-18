/*
  Warnings:

  - A unique constraint covering the columns `[Produk_ID]` on the table `produk` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Staf_ID]` on the table `user_pekerja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Telefon_Pekerja]` on the table `user_pekerja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Emel_Pekerja]` on the table `user_pekerja` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NoKP_Pekerja]` on the table `user_pekerja` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `NamaKategori` to the `produk` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Gaji_Pekerja` to the `user_pekerja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produk` ADD COLUMN `NamaKategori` VARCHAR(191) NOT NULL,
    MODIFY `Deskripsi_Produk` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user_pekerja` ADD COLUMN `Gaji_Pekerja` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nama_Kategori` VARCHAR(191) NOT NULL,
    `Deskripsi_Produk` VARCHAR(191) NULL,

    UNIQUE INDEX `kategori_Nama_Kategori_key`(`Nama_Kategori`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `produk_Produk_ID_key` ON `produk`(`Produk_ID`);

-- CreateIndex
CREATE UNIQUE INDEX `user_pekerja_Staf_ID_key` ON `user_pekerja`(`Staf_ID`);

-- CreateIndex
CREATE UNIQUE INDEX `user_pekerja_Telefon_Pekerja_key` ON `user_pekerja`(`Telefon_Pekerja`);

-- CreateIndex
CREATE UNIQUE INDEX `user_pekerja_Emel_Pekerja_key` ON `user_pekerja`(`Emel_Pekerja`);

-- CreateIndex
CREATE UNIQUE INDEX `user_pekerja_NoKP_Pekerja_key` ON `user_pekerja`(`NoKP_Pekerja`);

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_NamaKategori_fkey` FOREIGN KEY (`NamaKategori`) REFERENCES `kategori`(`Nama_Kategori`) ON DELETE RESTRICT ON UPDATE CASCADE;
