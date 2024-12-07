/*
  Warnings:

  - You are about to drop the column `last_signed_in_at` on the `Users` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_signed_in` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todos" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "last_signed_in_at",
ADD COLUMN     "last_signed_in" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Todos" ADD CONSTRAINT "Todos_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
