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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produk` (
    `id` VARCHAR(191) NOT NULL,
    `Produk_ID` VARCHAR(191) NOT NULL,
    `Nama_Produk` VARCHAR(191) NOT NULL,
    `Harga_Produk` VARCHAR(191) NOT NULL,
    `Saiz_Produk` VARCHAR(191) NOT NULL,
    `Deskripsi_Produk` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
