/*
  Warnings:

  - The primary key for the `_LabelToTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_LabelToTask` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_LabelToTask" DROP CONSTRAINT "_LabelToTask_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_LabelToTask_AB_unique" ON "_LabelToTask"("A", "B");
