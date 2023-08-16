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

// Example usage
function copyFiles(){
const sourceFilePaths = readNonEmptyLinesFromFile("SourceFilePath.txt");
const binFilePaths =    readAndModifyLinesFromFile("SourceFilePath.txt");
const destinationPathBin = './CopiedBin';
const destinationPath = './Copied';

copySpecificFilesByPaths(sourceFilePaths, destinationPath);
copySpecificFilesByPaths(binFilePaths, destinationPathBin);
console.log("Done")
}

module.exports = copyFiles;
