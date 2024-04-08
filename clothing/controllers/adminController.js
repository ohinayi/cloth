    //const { FSx } = require("aws-sdk");
    const Images = require("../model/adminModel");
    const users = require("../model/userModel");
    // const baseUrl = "http://localhost:3001";


    //function that gets all clothes
    const getClothes = async (req, res) => {
        const images = await Images.find();
        res.status(200).json(images);
    };

    //function to post clothes
    const postCloth = async (req, res) => {
        const baseUrl = "http://localhost:3001";

        if (!req.file) {
            return res.status(400).json({ "message": "please upload a file" });
        }
        const newcloth = {
            path: req.file.path.replace("public\\", `${baseUrl}/`),
            name: req.body.name,
            type: req.body.type,
            cost: req.body.cost,
            size: req.body.size
        };
        if (!newcloth.path || !newcloth.name || !newcloth.type || !newcloth.cost || !newcloth.size) {
            res.status(400).json({ "message": "input all fields as they are essential" });
            return
        }
        const image = await Images.create(newcloth);
        res.status(200).json(image);
    };

    //function to get all users
    const getUsers = async (req, res) => {
        const user = await users.find();
        res.status(200).json(user);
    }

    //function to get a single item
    const getCloth = async (req, res) => {
        const cloth = req.params.id;
        // console.log()
        const findCloth = await Images.findById(cloth);
        if (findCloth) {
            res.status(200).json(findCloth);
        }
        else {
            res.status(400).json({ "message": "cloth does not exist" });
            console.log(err);
        }
    }

    //function to update cloth
    const updateCloth = async (req, res) => {
        const findCloth = await Images.findById(req.body.id);
        if (!findCloth) {
            res.status(400).json({ "message": "cloth does not exist" });
            console.log("cloth does not exist");
        }
        const updatedCloth = await Images.findByIdAndUpdate(
            req.body.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedCloth);
    }

    //function to get a user
    const getUser = async (req, res) => {
        const user = req.params.id;
        const findUser = await users.findById(user);
        if (findUser) {
            res.status(200).json(findUser);
        }
        else {
            res.status(400).json({ "message": "user does not exist" });
        }
    };

    //function to delete an item
    const deleteCloth = async (req, res) => {
        const checkCloth = await Images.findByIdAndDelete(req.body.id);
        if (!checkCloth) {
            res.status(400).json({ "message": "item does not exist or cant be found" });
        }
        else {

            res.status(200).json({ "message": "deleted succesfully" });
        }
    }

    module.exports = { getCloth, getClothes, getUser, getUsers, deleteCloth, postCloth, updateCloth };