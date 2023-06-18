-- DropForeignKey
ALTER TABLE `jualan` DROP FOREIGN KEY `jualan_barcode_fkey`;

-- AddForeignKey
ALTER TABLE `jualan` ADD CONSTRAINT `jualan_barcode_fkey` FOREIGN KEY (`barcode`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
