const http = require("http");
const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = require("fs");

const logEvents = require("./logEvent"); // Check if the path is correct
const EventEmitter = require("events");

class Emitter extends EventEmitter {}

//initialize obj
const myEmitter = new Emitter();
myEmitter.on("log" , (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;

const severFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
             !contentType.includes("image") ? "utf-8" : ""
            ); // Use fs.readFile
        const data = contentType === "application/json" ? 
        JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes("404.html") ? 404:200,
             { 'Content-Type': contentType });
        response.end(
            contentType === "application/json" ? JSON.stringify(data) : data
        );
    } catch (error) {
        console.log(error);
        myEmitter.emit("log" , `${error.name}\t${error.message}` , "errorLog.txt");
        response.statusCode = 500;
        response.end();
    }
}

const sever = http.createServer((req , res)=> {
    console.log(req.url , req.method);
    myEmitter.emit("log" , `${req.url}\t${req.method}` , "reqLog.txt");
    const extension = path.extname(req.url);

    let contentType;


    switch (extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }

    let filePath = 
    contentType === 'text/html' && req.url === '/'
            ? path.join(__dirname, 'views', 'index.html')
            : contentType === 'text/html' && req.url.slice(-1) === '/'
                ? path.join(__dirname, 'views', req.url, 'index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, 'views', req.url)
                    : path.join(__dirname, req.url);


                    //make .html extention not required in the browser
                    if(!extension && req.url.slice(-1) !== '/'){
                        filePath += ".html";
                    }

                    const fileExists = fs.existsSync(filePath);

                    if(fileExists){
                        severFile(filePath, contentType , res);
                    }else{
                        //404
                        //301 redurect
                        switch(path.parse(filePath).base){
                            case "old-page-html":
                                res.writeHead(301, {"location": "/new-page.html"});
                                res.end();
                                break;
                            case "www-page.html" :
                                res.writeHead(301, {"location": "/"});
                                res.end();
                                break;
                            default : 
                            severFile(path.join(__dirname, "views" , "404.html"), contentType , res);
                        }
                    }

  
})

sever.listen(PORT , () => console.log(`SEVER RUNNING ON PORT ${PORT}`));







// myEmitter.on("log" , (msg) => logEvents(msg));

// myEmitter.emit("log" , '');