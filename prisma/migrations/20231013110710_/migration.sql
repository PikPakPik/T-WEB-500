/*
  Warnings:

  - You are about to drop the column `applicationId` on the `jobinformation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[advertissementId]` on the table `jobinformation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `advertissementId` to the `jobinformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `jobinformation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jobinformation` DROP FOREIGN KEY `jobinformation_applicationId_fkey`;

-- AlterTable
ALTER TABLE `jobinformation` DROP COLUMN `applicationId`,
    ADD COLUMN `advertissementId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `jobinformation_advertissementId_key` ON `jobinformation`(`advertissementId`);

-- AddForeignKey
ALTER TABLE `jobinformation` ADD CONSTRAINT `jobinformation_advertissementId_fkey` FOREIGN KEY (`advertissementId`) REFERENCES `advertissements`(`advertissementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jobinformation` ADD CONSTRAINT `jobinformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
