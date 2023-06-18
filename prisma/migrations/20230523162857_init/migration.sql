/*
  Warnings:

  - You are about to drop the column `Saiz_Produk` on the `produk` table. All the data in the column will be lost.
  - Added the required column `SaizProduk` to the `produk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `produk` DROP COLUMN `Saiz_Produk`,
    ADD COLUMN `SaizProduk` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `saizKuantiti` (
    `id` VARCHAR(191) NOT NULL,
    `Saiz` VARCHAR(191) NOT NULL,
    `Kuantiti` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `saizKuantiti_Saiz_key`(`Saiz`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_SaizProduk_fkey` FOREIGN KEY (`SaizProduk`) REFERENCES `saizKuantiti`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
