/*
  Warnings:

  - You are about to drop the column `doctor_id` on the `pemeriksaan` table. All the data in the column will be lost.
  - Added the required column `dokter_id` to the `pemeriksaan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pemeriksaan` DROP FOREIGN KEY `pemeriksaan_ibfk_3`;

-- AlterTable
ALTER TABLE `pemeriksaan` DROP COLUMN `doctor_id`,
    ADD COLUMN `dokter_id` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX `doctor_id` ON `pemeriksaan`(`dokter_id`);

-- AddForeignKey
ALTER TABLE `pemeriksaan` ADD CONSTRAINT `pemeriksaan_ibfk_3` FOREIGN KEY (`dokter_id`) REFERENCES `dokter`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
