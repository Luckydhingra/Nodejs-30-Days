/*
Problem 2: File Writer
Problem Statement: Create a function writeToFile(filePath, content) that takes 
the path to a file and user input content as input. 
The function should write the content to the specified file using the fs module.

*/

import {writeFile} from 'fs';

function writeToFile(filePath, content){
    writeFile(filePath, content, (err) => {
        if(err){
            console.log(`Error writing to file : ${err}`)
        }
        else{
            console.log(`Data written to ${filePath}`)
        }
    });
}

writeToFile('./Day2/test-files/output1.txt', "Day2 Node Js");
writeToFile("./Day2/test-files/nonexistent-folder/output.txt", "Non existing file");