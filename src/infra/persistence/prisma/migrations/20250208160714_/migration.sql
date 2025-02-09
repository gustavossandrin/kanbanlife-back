/*
  Warnings:

  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LabelToTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LabelToTask" DROP CONSTRAINT "_LabelToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_LabelToTask" DROP CONSTRAINT "_LabelToTask_B_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "labels" TEXT[];

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "_LabelToTask";
