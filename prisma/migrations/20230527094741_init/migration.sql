/*
  Warnings:

  - Added the required column `ID_Promosi` to the `promosi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `promosi` ADD COLUMN `ID_Promosi` VARCHAR(191) NOT NULL;
