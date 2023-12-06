/*
  Warnings:

  - You are about to alter the column `tgl_antrian` on the `antrian` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `antrian` MODIFY `tgl_antrian` DATETIME(0) NOT NULL;
