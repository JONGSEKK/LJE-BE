/*
  Warnings:

  - The primary key for the `kategori` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `kategori` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`Nama_Kategori`);
