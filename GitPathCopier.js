const { exec } = require('child_process');
const copyFiles = require ("./FileCopier.js");

const path = require('path');
const fs = require('fs');



// function fetchFilesFromGit(repositoryPath, userEmail, fromDate, toDate){
    
// for (let i=0; i<repositoryPath.length;i++){
//         getCommittedFilesByUserEmailAndDate(repositoryPath[i], userEmail, fromDate, toDate,committedFiles=>{
//             console.log("Writing files for repo", repositoryPath[i]);
//             writeStringsToFile(committedFiles,true);
          
//         })   
// }
    
// }

async function fetchFilesFromGit(repositoryPath, userEmail, fromDate, toDate) {
    const promises = repositoryPath.map(repoPath => {
        return new Promise((resolve, reject) => {
            getCommittedFilesByUserEmailAndDate(repoPath, userEmail, fromDate, toDate, committedFiles => {
                // console.log("Writing files for repo", repoPath);
                writeStringsToFile(committedFiles, true);
                resolve(); // Resolve the promise after completing the operation for this repo
            });
        });
    });

   return promises
}
function getCommittedFilesByUserEmailAndDate(repo, email, fromDate, toDate,callback) {
    const fromDateStr = fromDate;
    const toDateStr = toDate;
    const command = `git log --pretty=format:"%H" --author="${email}" --since="${fromDateStr}" --until="${toDateStr}" --name-only`;
    // console.log("command is",command, " and repo is ", repo)
    exec(command, { cwd: repo }, (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', error.message);
            return;
        }
     
        const lines = extractFilePathsFromList(stdout.trim().split('\n'),repo);
        callback(lines) 
    });
}


function extractFilePathsFromList(lines,repo) {
    const committedFiles = [];
    let isFilePath = false;
  

    for (const line of lines) {
        if (line === '') {
            isFilePath = false;
        } else if (line.includes("/")) {
            committedFiles.push(path.join(`${repo}`,line));
        }
    }

    return committedFiles;
}


function writeStringsToFile( strings, append = false) {
    const content = strings.join('\n'); // Join strings with newline character
    const flag = append ? 'a' : 'w'; // Use 'a' flag for append, 'w' flag for overwrite
    fs.writeFileSync("SourceFilePath.txt", content + '\n', { flag });
}


module.exports = fetchFilesFromGit;