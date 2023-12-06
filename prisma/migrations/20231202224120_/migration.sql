/*
  Warnings:

  - The primary key for the `anamnesis` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `no_anamnesis` on the `anamnesis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - The primary key for the `pemeriksaan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `no_pemeriksaan` on the `pemeriksaan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `no_anamnesis` on the `rekam_medis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to alter the column `no_pemeriksaan` on the `rekam_medis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `rekam_medis` DROP FOREIGN KEY `rekam_medis_ibfk_3`;

-- DropForeignKey
ALTER TABLE `rekam_medis` DROP FOREIGN KEY `rekam_medis_ibfk_4`;

-- AlterTable
ALTER TABLE `anamnesis` DROP PRIMARY KEY,
    MODIFY `no_anamnesis` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`no_anamnesis`);

-- AlterTable
ALTER TABLE `pemeriksaan` DROP PRIMARY KEY,
    MODIFY `no_pemeriksaan` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`no_pemeriksaan`);

-- AlterTable
ALTER TABLE `rekam_medis` MODIFY `no_anamnesis` INTEGER NOT NULL,
    MODIFY `no_pemeriksaan` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_ibfk_3` FOREIGN KEY (`no_anamnesis`) REFERENCES `anamnesis`(`no_anamnesis`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `rekam_medis` ADD CONSTRAINT `rekam_medis_ibfk_4` FOREIGN KEY (`no_pemeriksaan`) REFERENCES `pemeriksaan`(`no_pemeriksaan`) ON DELETE RESTRICT ON UPDATE RESTRICT;
