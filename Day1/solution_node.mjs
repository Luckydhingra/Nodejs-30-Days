/*
Problem 1: File Reader
Problem Statement: Create a function readFileContent(filePath) that takes
the path to a file as input and reads its content asynchronously using the fs module. 
The function should print the content to the console.

*/

import {readFile, readFileSync} from 'fs';
function readFileContent(filePath){
    readFile(filePath, 'utf8', (err, data) =>{
        if(err){
            if(err.code === 'ERROR_NOENT'){
                console.error(`Error reading file: ${err.code}`)
            }
            else{
                console.error(`Error reading file: ${err.message}`)
            }
        }
        else{
            console.log(`\n${data}`)
        }
    })
}

readFileContent('./Day1/file1.txt')
readFileContent('./Day1/empty-file.txt')
readFileContent('./Day1/nonexistent-file.txt')

 
