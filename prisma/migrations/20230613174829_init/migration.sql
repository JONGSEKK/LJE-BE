-- DropIndex
DROP INDEX `jualan_barcode_fkey` ON `jualan`;

-- AlterTable
ALTER TABLE `jualan` ADD COLUMN `HargaProduk` INTEGER NULL,
    ADD COLUMN `NamaProduk` VARCHAR(191) NULL;
