/*
  Warnings:

  - The `cep` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `telefone` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `cnpjOuCPF` on the `Cliente` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "cep",
ADD COLUMN     "cep" INTEGER,
DROP COLUMN "cnpjOuCPF",
ADD COLUMN     "cnpjOuCPF" INTEGER NOT NULL,
DROP COLUMN "telefone",
ADD COLUMN     "telefone" INTEGER;
