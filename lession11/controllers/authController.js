const usersDB = {
    users: require("../model/users.json"),
    setUsers: function (data) {this.users = data}
}
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
    const{user , pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({"message" : "UserName and Password are Required."});
    const foundUSer = usersDB.users.find(person => person.username === user);
    if(!foundUSer) return res.sendStatus(401); //Unauthorized

    //evaluate password
    const match = await bcrypt.compare(pwd , foundUSer.password);
    if(match){
        // create JWTs
        res.json({"success" : `User ${user} is Logged In!`});
    }else{
        res.sendStatus(401);
    }
}
module.exports = {handleLogin};