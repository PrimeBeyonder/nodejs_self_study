//three type of middleware
//1-Built-In middleware tihandle urlencoded data
//in other words , form data
//2-Custome middleware
//3-middleware from third party


const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const {logger}  = require("./middleware/logEvent");
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;


//custome middleware logger
app.use(logger);

//corss origin Res Sharing
const whtieList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whtieList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


//1-Built-In middleware tihandle urlencoded data
//in other words , form data
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//sever static files
app.use(express.static(path.join(__dirname, "/public")))




app.get("^/$|/index(.html)?" , (req,  res) => {
    // res.sendFile("./views/index.html" , {root: __dirname});
    res.sendFile(path.join(__dirname, "views" , "index.html"));
});
app.get("/new-page(.html)?" , (req,  res) => {
    // res.sendFile("./views/new-page.html" , {root: __dirname});
    res.sendFile(path.join(__dirname, "views" , "new-page.html"));
});
app.get("/old-page(.html)?" , (req,  res) => {
    // res.sendFile("./views/new-page.html" , {root: __dirname});
    res.redirect(301,"/new-page.html"); //302 by default
});

//Route Handlers
app.get("/hello(.html)?" ,(req , res , next) =>{
    console.log("Attepmted to load hello.hmtl");
    next();
}, (req , res) => {
    res.send("Hello Word!");
})

//changing route handlers

const one =( req , res , next) =>{
    console.log("one");
    next();
}
const two =( req , res , next) =>{
    console.log("two");
    next();
}
const three =( req , res ) =>{
    console.log("three");
    res.send("Finished!")
}

app.get("/chain(.html)?" , [one, two , three]);

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT , () => console.log(`SEVER RUNNING ON PORT ${PORT}`));
