/*
  Warnings:

  - The `inscricaoEstadual` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "inscricaoEstadual",
ADD COLUMN     "inscricaoEstadual" INTEGER;
