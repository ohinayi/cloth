const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    name:{
        type:String,
        required:[true,"please input name"],
    },
    email: {
        type: String,
        required:[true, "please input email"],
    },
    password: {
        type:String,
        required:[true, "please input password"],
    },
    address: {
        type:String,
        required:[true,"please input adress"],
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model("users", userSchema );