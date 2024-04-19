const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mongoDBTestUser:ANDREW123@cluster0.htirleh.mongodb.net/CompanyDB?retryWrites=true&w=majority&appName=Cluster0", {
         
           
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB