/*
  Warnings:

  - You are about to alter the column `Kuantiti_Produk` on the `produk` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `produk` MODIFY `Kuantiti_Produk` INTEGER NULL;
