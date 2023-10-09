-- CreateTable
CREATE TABLE `applications` (
    `applicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `advertissementId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`applicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applicationinformation` (
    `jobinformationId` INTEGER NOT NULL AUTO_INCREMENT,
    `lastName` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `exp` VARCHAR(191) NOT NULL,
    `school` VARCHAR(191) NOT NULL,
    `skills` VARCHAR(191) NOT NULL,
    `applicationId` INTEGER NOT NULL,

    UNIQUE INDEX `applicationinformation_applicationId_key`(`applicationId`),
    PRIMARY KEY (`jobinformationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_advertissementId_fkey` FOREIGN KEY (`advertissementId`) REFERENCES `advertissements`(`advertissementId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applicationinformation` ADD CONSTRAINT `applicationinformation_applicationId_fkey` FOREIGN KEY (`applicationId`) REFERENCES `applications`(`applicationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
