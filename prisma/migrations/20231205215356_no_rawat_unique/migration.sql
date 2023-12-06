/*
  Warnings:

  - A unique constraint covering the columns `[no_rawat]` on the table `antrian` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `antrian_no_rawat_key` ON `antrian`(`no_rawat`);
