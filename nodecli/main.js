const myModule = require("./my-module");
const program = require("commander");
const fs = require("fs");

// console.log(myModule.foo);

// console.log('Hello World!');


program.parse(process.argv);
const filePath = program.args[0];

fs.readFile(filePath, { encoding: "utf8" }, (error, file)=> {
    if(error) {
        console.error(error.message);
        process.exit(1);
        return;
    } 
    console.log(file);
})