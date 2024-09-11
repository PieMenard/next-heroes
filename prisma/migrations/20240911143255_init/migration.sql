/*
  Warnings:

  - You are about to drop the column `dangeorus` on the `Power` table. All the data in the column will be lost.
  - Added the required column `dangerous` to the `Power` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Power" DROP COLUMN "dangeorus",
ADD COLUMN     "dangerous" BOOLEAN NOT NULL;
