const {format} = require("date-fns");
const {v4 : uuid} = require("uuid");

const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");

const logEvents = async ( message) => {
    const dateTime = `${format(new Date() , "yyyy-MM-dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, "logs")))
        {
            await fsPromise.mkdir(path.join(__dirname, "logs"));
        }
        //testin
        await fsPromise.appendFile(path.join(__dirname, "logs" , "eventLog.txt"), logItem);
    } catch (error) {
        console.error(error);
    }
}

module.exports = logEvents;