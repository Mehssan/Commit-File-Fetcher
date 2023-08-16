const fetchFilesFromGit = require ("./GitPathCopier");
const path = require('path');
const fs = require('fs');
const copyFiles = require("./FileCopier");


const userEmail = 'mehssan@i2cinc.com';
const repositoryPath = ['D:/Repositry/APIs','D:/Repositry/Git S3 Repository/CommonBusinessServices','D:/Repositry/Git S3 Repository/Services3.0','D:/Repositry/Git S3 Repository/CommonServices'];
const fromDate = '2023-07-19'; // Replace with your desired "from" date
const toDate = '2023-08-15';   // Replace with your desired "to" date
const commentFilesFlag= true;


clearFileContents("SourceFilePath.txt")
deleteAllFilesInFolder("./Copied")
deleteAllFilesInFolder("./CopiedBin")

fetchFilesFromGit(repositoryPath,userEmail,fromDate,toDate).then(async (promises)=>{
    await Promise.all(promises);
    console.log("fetchFilesFromGit completed successfully.");
    console.log("Copying Files now");

    copyFiles(commentFilesFlag);
})

























function deleteAllFilesInFolder(folderPath) {
    fs.readdirSync(folderPath).forEach(file => {
        const filePath = path.join(folderPath, file);
        if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
        }
    });
    console.log(`Contents of ${folderPath} have been cleared.`);

}

function clearFileContents(filePath) {
    try {
      fs.truncateSync(filePath, 0); // Truncate the file to 0 bytes
      console.log(`Contents of ${filePath} have been cleared.`);
    } catch (error) {
      console.error(`Error clearing file contents: ${error}`);
    }
  }