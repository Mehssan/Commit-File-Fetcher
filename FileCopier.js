const fs = require('fs');
const path = require('path');

function copySpecificFilesByPaths(filePaths, destinationPath) {
    try {
        // Create the destination directory if it doesn't exist
        if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath, { recursive: true });
        }

        filePaths.forEach(filePath => {
            // Extract the filename from the complete path
            const fileName = path.basename(filePath);

            // Check if the source file exists
            if (fs.existsSync(filePath)) {
                const destinationFile = path.join(destinationPath, fileName);
                fs.copyFileSync(filePath, destinationFile);
                // console.log(`File "${fileName}" copied successfully.`);
            } else {
                // console.log(`File "${fileName}" not found.`);
            }
        });

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}


function readNonEmptyLinesFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    return nonEmptyLines;
}

function readAndModifyLinesFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const nonEmptyModifiedLines = lines
        .map(line => line.replace(/src/g, 'bin').replace(/java/g, 'class'))
        .filter(line => line.trim() !== '');
    return nonEmptyModifiedLines;
}

function commentOutAllFilesInDirectory(directoryPath) {
    try {
      const files = fs.readdirSync(directoryPath);
  
      files.forEach(fileName => {
        const filePath = path.join(directoryPath, fileName);
        commentOutFile(filePath, "/*", "*/");
      });
  
      console.log('All files in the directory have been fully commented.');
    } catch (error) {
      console.error(`Error commenting out files: ${error}`);
    }
  }
  
  function commentOutFile(filePath, commentStart, commentEnd) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const lines = fileContent.split('\n');
  
      const existingComments = lines.filter(line => line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().endsWith('*/'));
      const contentWithoutComments = lines.filter(line => !existingComments.includes(line));
      const commentedContent = commentStart + '\n' + contentWithoutComments.join('\n') + '\n' + commentEnd;
  
      fs.writeFileSync(filePath, commentedContent);
    } catch (error) {
      console.error(`Error commenting out file: ${error}`);
    }
  }


// Example usage
function copyFiles(commentFilesFlag){
const sourceFilePaths = readNonEmptyLinesFromFile("SourceFilePath.txt");
const binFilePaths =    readAndModifyLinesFromFile("SourceFilePath.txt");
const destinationPathBin = './CopiedBin';
const destinationPath = './Copied';

copySpecificFilesByPaths(sourceFilePaths, destinationPath);
copySpecificFilesByPaths(binFilePaths, destinationPathBin);
console.log("All Files Copied")
if(commentFilesFlag)
  commentOutAllFilesInDirectory(destinationPath);
else
 console.log("Skipping comments")
}

module.exports = copyFiles;
