const logEvents = require("./logEvent");

const EventEmitter = require("events");

class MyEmitter extends EventEmitter{};


//initialize obj
const myEmitter = new MyEmitter();

//add listener for the log event
myEmitter.on("log", (msg) => logEvents(msg));

setTimeout(() => {
    //Emit event
    myEmitter.emit("log" , "Log Event Emitted");
}, 2000);