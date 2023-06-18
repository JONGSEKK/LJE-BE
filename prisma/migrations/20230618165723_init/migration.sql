-- CreateTable
CREATE TABLE `user_pekerja` (
    `id` VARCHAR(191) NOT NULL,
    `Staf_ID` VARCHAR(191) NOT NULL,
    `Nama_Pekerja` VARCHAR(191) NOT NULL,
    `Telefon_Pekerja` VARCHAR(191) NOT NULL,
    `Emel_Pekerja` VARCHAR(191) NOT NULL,
    `Alamat_Pekerja` VARCHAR(191) NOT NULL,
    `NoKP_Pekerja` VARCHAR(191) NOT NULL,
    `Peranan_Pekerja` VARCHAR(191) NOT NULL,
    `KataLaluan_Pekerja` VARCHAR(191) NOT NULL,
    `Gaji_Pekerja` INTEGER NOT NULL,
    `GambarPekerja` VARCHAR(191) NULL,

    UNIQUE INDEX `user_pekerja_Staf_ID_key`(`Staf_ID`),
    UNIQUE INDEX `user_pekerja_Telefon_Pekerja_key`(`Telefon_Pekerja`),
    UNIQUE INDEX `user_pekerja_Emel_Pekerja_key`(`Emel_Pekerja`),
    UNIQUE INDEX `user_pekerja_NoKP_Pekerja_key`(`NoKP_Pekerja`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id` VARCHAR(191) NOT NULL,
    `Nama_Kategori` VARCHAR(191) NOT NULL,
    `Deskripsi_Kategori` VARCHAR(191) NULL,

    UNIQUE INDEX `kategori_Nama_Kategori_key`(`Nama_Kategori`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produk` (
    `id` VARCHAR(191) NOT NULL,
    `Produk_ID` VARCHAR(191) NOT NULL,
    `Nama_Produk` VARCHAR(191) NOT NULL,
    `Gambar` VARCHAR(191) NULL,
    `Harga_Produk` VARCHAR(191) NOT NULL,
    `Deskripsi_Produk` VARCHAR(191) NULL,
    `kategoriProduk` VARCHAR(191) NOT NULL,
    `Saiz_Produk` VARCHAR(191) NULL,
    `Kuantiti_Produk` INTEGER NOT NULL DEFAULT 0,
    `Kuantiti_Tambahan` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `produk_Produk_ID_key`(`Produk_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `jualan` (
    `id` VARCHAR(191) NOT NULL,
    `barcode` VARCHAR(191) NOT NULL,
    `kuantiti` INTEGER NOT NULL,
    `jumlahHarga` INTEGER NOT NULL,
    `HargaProduk` INTEGER NULL,
    `NamaProduk` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifikasi` (
    `id` VARCHAR(191) NOT NULL,
    `kuantitiTambah` INTEGER NOT NULL,
    `permohonan` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produk` ADD CONSTRAINT `produk_kategoriProduk_fkey` FOREIGN KEY (`kategoriProduk`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `promosi` ADD CONSTRAINT `promosi_kategoriTerlibat_fkey` FOREIGN KEY (`kategoriTerlibat`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
