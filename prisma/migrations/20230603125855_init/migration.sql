/*
  Warnings:

  - You are about to alter the column `Telefon_Pekerja` on the `user_pekerja` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `NoKP_Pekerja` on the `user_pekerja` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `Gaji_Pekerja` on the `user_pekerja` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `user_pekerja` MODIFY `Telefon_Pekerja` INTEGER NOT NULL,
    MODIFY `NoKP_Pekerja` INTEGER NOT NULL,
    MODIFY `Gaji_Pekerja` INTEGER NOT NULL;
