/*
  Warnings:

  - You are about to alter the column `no_antrian` on the `antrian` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - A unique constraint covering the columns `[no_rawat]` on the table `antrian` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `antrian` MODIFY `no_antrian` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `antrian_no_rawat_key` ON `antrian`(`no_rawat`);
