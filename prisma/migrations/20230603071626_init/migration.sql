/*
  Warnings:

  - Made the column `Kuantiti_Produk` on table `produk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `produk` MODIFY `Kuantiti_Produk` INTEGER NOT NULL;
