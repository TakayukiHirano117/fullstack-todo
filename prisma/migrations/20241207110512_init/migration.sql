/*
  Warnings:

  - You are about to drop the column `authorId` on the `Todos` table. All the data in the column will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todos" DROP CONSTRAINT "Todos_authorId_fkey";

-- AlterTable
ALTER TABLE "Todos" DROP COLUMN "authorId";

-- DropTable
DROP TABLE "Users";
