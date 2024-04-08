const mongoose = require("mongoose");

const userSavedSchema = mongoose.Schema({
    user_id: {
        type:String,
        required: true,
        ref: "user",
    },
    name: {
        type:String,
        required: [true,"please add the name"],
    },
    path: {
        type:String,
        require: [true,"please add the image"],
    },
    type: {
        type:String,
        required: [true,"please add the type of item"],
    },
    cost: {
        type:String,
        required: [true,"please add the cost of item"],
    },
    size: {
        type:String,
        required: [true,"please add the size of item"],
    },
    email: {
        type:String,
        required: [true,"please add the email of item"],
    },
    address: {
        type:String,
        required: [true,"please add the adress of item"],
    },
}, {
    timestamps: true,
},
);

module.exports = mongoose.model("userSaved", userSavedSchema);