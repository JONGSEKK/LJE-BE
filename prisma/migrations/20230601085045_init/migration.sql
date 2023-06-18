-- CreateTable
CREATE TABLE `jualan` (
    `id` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `kuantiti` INTEGER NOT NULL,
    `jumlahHarga` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jualan` ADD CONSTRAINT `jualan_barcode_fkey` FOREIGN KEY (`barcode`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
