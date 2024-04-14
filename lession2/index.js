const { log } = require("console");
const fs = require("fs");

fs.readFile('./text/start.txt', (err , data) => {
    if(err) throw err;
    console.log(data); //Buffer data
    console.log(data.toString()); //string, UTF8 = string
})

process.on("uncaughtException" , err => {
    console.error(`There is an Error : ${err}`);
    process.exit(1)
})