const { log } = require("console");
const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "text" , 'starter.txt'), 'utf-8',(err , data) => {
    if(err) throw err;
    console.log(data); //Buffer data
    console.log(data.toString()); //string, UTF8 = string
})


fs.writeFile(path.join(__dirname, "text" , 'reply.txt'), "Nice To Meet You, Im from Wrte",(err) => {
    if(err) throw err;
    console.log("Write Complete");
})


console.log("hello")
process.on("uncaughtException" , err => {
    console.error(`There is an Error : ${err}`);
    process.exit(1)
})