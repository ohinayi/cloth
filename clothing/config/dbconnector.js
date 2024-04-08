const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";

const connectDB = async () => {
    try{
       const connect = await mongoose.connect(url);
       console.log("database connected");
    }catch{
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;