/*
  Warnings:

  - A unique constraint covering the columns `[no_rawat]` on the table `anamnesis` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[no_rawat]` on the table `pemeriksaan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `anamnesis_no_rawat_key` ON `anamnesis`(`no_rawat`);

-- CreateIndex
CREATE UNIQUE INDEX `pemeriksaan_no_rawat_key` ON `pemeriksaan`(`no_rawat`);
