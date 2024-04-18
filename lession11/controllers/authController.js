const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {this.users = data}
}
const bcrypt = require("bcrypt");
const { config } = require("dotenv");

const handleLogin = async (req, res) => {

    const jwt = require("jsonwebtoken");
    require("dotenv").config();
    const fsPromise = require("fs").promises;
    const path = require("path");

    const{user , pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({"message" : "UserName and Password are Required."});
    const foundUSer = usersDB.users.find(person => person.username === user);
    if(!foundUSer) return res.sendStatus(401); //Unauthorized

    //evaluate password
    const match = await bcrypt.compare(pwd , foundUSer.password);
    if(match){
        // create JWTs
        const accessToken = jwt.sign(
            {"username" : foundUSer.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "30s" }
        );
        const refreshToken = jwt.sign(
            {"username" : foundUSer.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: "1d" }
        );
        // saving refreshTOken with current user 
        const otherUsers = usersDB.users.filter(person => person.username !== foundUSer.username);
        const currentUser = {...foundUSer , refreshToken};
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromise.writeFile(
            path.join(__dirname,  ".." , "model" , "users.json"),
            JSON.stringify(usersDB.users)
        )
        res.cookie("jwt" , refreshToken, {httpOnly: true , maxAge: 24 * 60 * 60 * 1000});
        res.json({ accessToken });
    
    }else{
        res.sendStatus(401);
    }
}
module.exports = {handleLogin};