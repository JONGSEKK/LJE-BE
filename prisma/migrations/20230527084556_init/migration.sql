/*
  Warnings:

  - You are about to alter the column `Harga_Promosi` on the `promosi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `promosi` MODIFY `Harga_Promosi` INTEGER NOT NULL;
