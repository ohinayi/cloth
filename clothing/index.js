const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const cors = require("cors");
const admin = require("./routers/admin");
const users  = require("./routers/users");
const createAdmin = require("./routers/createAdmin");
const connectDB = require("./config/dbconnector");
const validateToken = require("./middleware/validateToken");

app.use(cors());

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));

connectDB();
// app.post()
app.use(createAdmin);
app.use(users);
app.use(validateToken);
app.use(admin);


app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`);
});