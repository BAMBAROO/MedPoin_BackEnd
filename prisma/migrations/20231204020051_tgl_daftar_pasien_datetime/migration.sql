/*
  Warnings:

  - You are about to alter the column `tgl_daftar` on the `pasien` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `pasien` MODIFY `tgl_daftar` DATETIME(0) NOT NULL;
