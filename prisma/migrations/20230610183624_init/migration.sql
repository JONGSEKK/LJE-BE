-- CreateTable
CREATE TABLE `notifikasi` (
    `id` VARCHAR(191) NOT NULL,
    `ProdukID` VARCHAR(191) NOT NULL,
    `kuantitiTambah` INTEGER NOT NULL,
    `permohonan` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notifikasi` ADD CONSTRAINT `notifikasi_id_fkey` FOREIGN KEY (`id`) REFERENCES `produk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
