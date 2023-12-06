/*
  Warnings:

  - Added the required column `resep_obat` to the `pemeriksaan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pemeriksaan` ADD COLUMN `resep_obat` VARCHAR(255) NOT NULL;
