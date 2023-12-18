-- CreateTable
CREATE TABLE `staf` (
    `id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `staf_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anamnesis` (
    `no_rm` VARCHAR(255) NOT NULL,
    `no_rawat` VARCHAR(255) NOT NULL,
    `dokter_id` VARCHAR(255) NOT NULL,
    `perawat_id` VARCHAR(255) NOT NULL,
    `berat` VARCHAR(255) NOT NULL,
    `tinggi` VARCHAR(255) NOT NULL,
    `tensi` VARCHAR(255) NOT NULL,
    `saturasi` VARCHAR(255) NOT NULL,
    `suhu` VARCHAR(255) NOT NULL,
    `no_anamnesis` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `anamnesis_no_rawat_key`(`no_rawat`),
    INDEX `dokter_id`(`dokter_id`),
    INDEX `no_rawat`(`no_rawat`),
    INDEX `no_rm`(`no_rm`),
    INDEX `perawat_id`(`perawat_id`),
    PRIMARY KEY (`no_anamnesis`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `antrian` (
    `no_antrian` INTEGER NOT NULL,
    `tgl_antrian` DATETIME(0) NOT NULL,
    `no_rm` VARCHAR(255) NOT NULL,
    `no_rawat` VARCHAR(255) NOT NULL,
    `dokter_id` VARCHAR(255) NOT NULL,
    `status` INTEGER NOT NULL,

    UNIQUE INDEX `antrian_no_rawat_key`(`no_rawat`),
    INDEX `dokter_id`(`dokter_id`),
    INDEX `no_rm`(`no_rm`),
    PRIMARY KEY (`no_rawat`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dokter` (
    `id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `spesialis` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `dokter_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `icd10` (
    `id` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `icd9` (
    `id` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pasien` (
    `no_rm` VARCHAR(100) NOT NULL,
    `tgl_daftar` DATETIME(0) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `no_ktp` VARCHAR(25) NOT NULL,
    `no_bpjs` VARCHAR(25) NOT NULL,
    `tempat_lahir` VARCHAR(100) NOT NULL,
    `tanggal_lahir` VARCHAR(100) NOT NULL,
    `jenis_kelamin` VARCHAR(20) NOT NULL,
    `gol_darah` VARCHAR(4) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `nama_keluarga` VARCHAR(100) NOT NULL,
    `no_hp_keluarga` VARCHAR(15) NOT NULL,
    `alamat_lengkap` VARCHAR(100) NOT NULL,
    `status_perkawinan` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`no_rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pemeriksaan` (
    `no_rm` VARCHAR(255) NOT NULL,
    `no_rawat` VARCHAR(255) NOT NULL,
    `dokter_id` VARCHAR(255) NOT NULL,
    `keluhan` VARCHAR(255) NOT NULL,
    `tindakan` VARCHAR(255) NOT NULL,
    `resep_obat` VARCHAR(255) NOT NULL,
    `diagnosis` VARCHAR(255) NOT NULL,
    `no_pemeriksaan` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `pemeriksaan_no_rawat_key`(`no_rawat`),
    INDEX `diagnosis`(`diagnosis`),
    INDEX `dokter_id`(`dokter_id`),
    INDEX `no_rawat`(`no_rawat`),
    INDEX `no_rm`(`no_rm`),
    INDEX `tindakan`(`tindakan`),
    PRIMARY KEY (`no_pemeriksaan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perawat` (
    `id` VARCHAR(100) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `perawat_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rekam_medis` (
    `no_rm` VARCHAR(255) NOT NULL,
    `no_rawat` VARCHAR(255) NOT NULL,
    `no_anamnesis` INTEGER NOT NULL,
    `no_pemeriksaan` INTEGER NOT NULL,

    INDEX `no_anamnesis`(`no_anamnesis`),
    INDEX `no_pemeriksaan`(`no_pemeriksaan`),
    INDEX `no_rawat`(`no_rawat`),
    PRIMARY KEY (`no_rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token` (
    `refresh_token` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `refresh_token_UNIQUE`(`refresh_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anamnesis` ADD CONSTRAINT `anamnesis_ibfk_1` FOREIGN KEY (`no_rm`) REFERENCES `pasien`(`no_rm`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `anamnesis` ADD CONSTRAINT `anamnesis_ibfk_2` FOREIGN KEY (`no_rawat`) REFERENCES `antrian`(`no_rawat`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `anamnesis` ADD CONSTRAINT `anamnesis_ibfk_3` FOREIGN KEY (`perawat_id`) REFERENCES `perawat`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `anamnesis` ADD CONSTRAINT `anamnesis_ibfk_4` FOREIGN KEY (`dokter_id`) REFERENCES `dokter`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `antrian` ADD CONSTRAINT `antrian_ibfk_1` FOREIGN KEY (`no_rm`) REFERENCES `pasien`(`no_rm`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `antrian` ADD CONSTRAINT `antrian_ibfk_2` FOREIGN KEY (`dokter_id`) REFERENCES `dokter`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemeriksaan` ADD CONSTRAINT `pemeriksaan_ibfk_1` FOREIGN KEY (`no_rm`) REFERENCES `pasien`(`no_rm`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemeriksaan` ADD CONSTRAINT `pemeriksaan_ibfk_2` FOREIGN KEY (`no_rawat`) REFERENCES `antrian`(`no_rawat`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemeriksaan` ADD CONSTRAINT `pemeriksaan_ibfk_3` FOREIGN KEY (`dokter_id`) REFERENCES `dokter`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemeriksaan` ADD CONSTRAINT `pemeriksaan_ibfk_4` FOREIGN KEY (`tindakan`) REFERENCES `icd9`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pemeriksaan` ADD CONSTRAINT `pemeriksaan_ibfk_5` FOREIGN KEY (`diagnosis`) REFERENCES `icd10`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_ibfk_1` FOREIGN KEY (`no_rm`) REFERENCES `pasien`(`no_rm`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_ibfk_2` FOREIGN KEY (`no_rawat`) REFERENCES `antrian`(`no_rawat`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_ibfk_3` FOREIGN KEY (`no_anamnesis`) REFERENCES `anamnesis`(`no_anamnesis`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_ibfk_4` FOREIGN KEY (`no_pemeriksaan`) REFERENCES `pemeriksaan`(`no_pemeriksaan`) ON DELETE RESTRICT ON UPDATE RESTRICT;
