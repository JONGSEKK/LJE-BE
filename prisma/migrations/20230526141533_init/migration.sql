-- CreateTable
CREATE TABLE `promosi` (
    `id` VARCHAR(191) NOT NULL,
    `ID_Promosi` VARCHAR(191) NOT NULL,
    `Nama_Promosi` VARCHAR(191) NOT NULL,
    `Deskripsi_Promosi` VARCHAR(191) NOT NULL,
    `Harga_Promosi` INTEGER NOT NULL,
    `Status_Promosi` VARCHAR(191) NOT NULL,
    `kategoriTerlibat` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `promosi` ADD CONSTRAINT `promosi_kategoriTerlibat_fkey` FOREIGN KEY (`kategoriTerlibat`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
