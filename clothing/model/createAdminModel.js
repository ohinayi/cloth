const mongoose = require("mongoose");

const createAdminSchema= mongoose.Schema({
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
   
},
{
    timestamps:true,
});

module.exports = mongoose.model("admins", createAdminSchema );