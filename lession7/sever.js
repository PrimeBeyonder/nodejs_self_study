//three type of middleware
//1-Built-In middleware tihandle urlencoded data
//in other words , form data
//2-Custome middleware
//3-middleware from third party


const express = require("express");
const app = express();
const path = require("path");
const {logger } = require("./middleware/logEvent");
const PORT = process.env.PORT || 3500;


//custome middleware logger

app.use(logger);



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

app.get("/*" , (req  ,res) =>{
    res.status(404).sendFile(path.join(__dirname , "views" , "404.html"))
})

app.listen(PORT , () => console.log(`SEVER RUNNING ON PORT ${PORT}`));
