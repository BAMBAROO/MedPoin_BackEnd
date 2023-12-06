/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `dokter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `perawat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `staf` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `dokter_id_key` ON `dokter`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `perawat_id_key` ON `perawat`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `staf_id_key` ON `staf`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_id_key` ON `user`(`id`);
