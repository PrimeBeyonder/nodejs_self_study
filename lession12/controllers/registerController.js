const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {this.users = data}
}
const fsPromise = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req , res) => {
    const{user , pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({"message" : "UserName and Password are Required."});
    //check for duplicate usernames in the db
    const duplicate = usersDB.users.find(person =>person.username === user);
    if(duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = {"username" : user , "password" : hashedPwd};
        usersDB.setUsers([...usersDB.users , newUser]);
        await fsPromise.writeFile(
            path.join(__dirname, ".." , "model" , "users.json"),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({"success" : `New User ${user} has been created!`});
    } catch (error) {
        res.status(500).json({"message" : error.message});
    }
}

module.exports = {handleNewUser};