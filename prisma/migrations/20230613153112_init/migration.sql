-- DropIndex
DROP INDEX `jualan_barcode_fkey` ON `jualan`;

-- AddForeignKey
ALTER TABLE `jualan` ADD CONSTRAINT `jualan_barcode_fkey` FOREIGN KEY (`barcode`) REFERENCES `produk`(`Produk_ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
