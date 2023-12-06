/*
  Warnings:

  - Added the required column `alamat_lengkap` to the `pasien` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_perkawinan` to the `pasien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pasien` ADD COLUMN `alamat_lengkap` VARCHAR(100) NOT NULL,
    ADD COLUMN `status_perkawinan` VARCHAR(15) NOT NULL;
