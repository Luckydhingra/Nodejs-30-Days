const path = require("path");

function resolvePath(relativePath){
    const absolutePath = path.resolve(__dirname, relativePath);
    console.log(`Resolved Path: ${absolutePath}`)
}

resolvePath("./Day4/file.txt");
resolvePath('./nonexistent-folder/file.txt'); 