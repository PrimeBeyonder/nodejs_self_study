fs.readFile(path.join(__dirname, "text" , 'lorem.txt'), 'utf-8',(err , data) => {
    if(err) throw err;
    console.log(data); //Buffer data
    console.log(data.toString()); //string, UTF8 = string
})


fs.writeFile(path.join(__dirname, "text" , 'reply.txt'), "Nice To Meet You",(err) => {
    if(err) throw err;
    console.log("Write Complete");

    fs.appendFile(path.join(__dirname, "text" , 'reply.txt'), "\n\n Yes It Is",(err) => {
        if(err) throw err;
        console.log("Append Complete");

        fs.rename(path.join(__dirname, "text" , 'reply.txt'),path.join(__dirname, "text" , 'NewReply.txt') , (err) => {
            if(err) throw err;
            console.log("Remane Complete");        
        })
    })
})


console.log("hello")
process.on("uncaughtException" , err => {
    console.error(`There is an Error : ${err}`);
    process.exit(1)
})