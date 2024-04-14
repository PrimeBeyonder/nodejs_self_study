
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () =>{
    try {

        //Read Data From Lorem.txt
        const data = await fsPromises.readFile(path.join(__dirname,"text" , 'lorem.txt'), "utf-8");

        //Write data to lorem.txt(overwrite)
        await fsPromises.writeFile(path.join(__dirname,"text" , 'lorem.txt'),  "Hi I rewrite a Lorem.txt file", "utf-8");


        // Write data to promiseWrite.txt
        await fsPromises.writeFile(path.join(__dirname,"text" , 'promiseWrite.txt'), data);

        // Append additional data to promiseWrite.txt
        await fsPromises.appendFile(path.join(__dirname,"text" , 'promiseWrite.txt'), '\n\n Nice To Meet You.');

        // Rename promiseWrite.txt to NewpromiseWrite.txt
        await fsPromises.rename(path.join(__dirname,"text" , 'promiseWrite.txt'), path.join(__dirname,"text" , 'NewpromiseWrite.txt'));


        // Read data from NewpromiseWrite.txt
        const newData = await fsPromises.readFile(path.join(__dirname, "text", 'NewpromiseWrite.txt'), "utf-8");


        console.log(newData);
    } catch (error) {
        console.error(error);
    }
}
fileOps();

