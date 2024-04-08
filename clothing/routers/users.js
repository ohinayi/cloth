const express = require("express");
const router = express.Router();
const users = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");


router.route("/user/login").post(users.login);
router.route("/user/createUser").post(users.createUser);
router.use(validateToken);
router.route("/user/addToStore").post(users.addToStore);
router.route("/user/removeFromStore").delete(users.removeFromStore);
router.route("/user").get(users.getClothes);
router.route("/soldItems").get(users.allStore);
router.route("/user/store").get(users.store);

module.exports = router;