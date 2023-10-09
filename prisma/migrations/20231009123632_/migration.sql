/*
  Warnings:

  - The primary key for the `applicationinformation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `jobinformationId` on the `applicationinformation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `applicationinformation` DROP PRIMARY KEY,
    DROP COLUMN `jobinformationId`;

-- CreateTable
CREATE TABLE `jobinformation` (
    `isSaved` BOOLEAN NOT NULL DEFAULT false,
    `isApplied` BOOLEAN NOT NULL DEFAULT false,
    `applicationId` INTEGER NOT NULL,

    UNIQUE INDEX `jobinformation_applicationId_key`(`applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jobinformation` ADD CONSTRAINT `jobinformation_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `applications`(`applicationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
