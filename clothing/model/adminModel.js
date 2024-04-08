const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
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
}, {
    timestamps: true,
},
);

module.exports = mongoose.model("Images", imageSchema);