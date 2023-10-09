-- AddForeignKey
ALTER TABLE `advertissements` ADD CONSTRAINT `advertissements_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
