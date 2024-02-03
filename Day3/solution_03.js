/*
Problem 3: Execute Command
Problem Statement: Create a function executeCommand(command) that takes a shell command as 
input and executes it using the child_process module. 
The function should print the output of the command to the console.
*/

const exe1 = require('child_process')
// console.log(exe1)

function executeCommand(command) {
    exe1.exec(command ,(error, stdout, strerr) =>{
       if(error){
        console.log(`error ${error}`)
        return;
       }
       console.log(`Command output: \n ${stdout}`)
       if(strerr){
        console.log(`std error: ${strerr}`)
       }
    })
}

executeCommand('ls -la');
executeCommand('echo "Hello, Node.js!"');