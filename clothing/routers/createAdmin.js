const express = require("express");
const router = express.Router();
const admin = require("../controllers/createAdminController");
const validateToken = require("../middleware/validateToken");

router.route("/Admin/login").post(admin.login);
router.route("/admin/create").post(validateToken,admin.create);
router.route("/admin/view").get(validateToken,admin.viewAdmin);
router.route("/admin/delete").delete(validateToken,admin.deleteAdmin);
router.route("/admin/update").put(validateToken,admin.update);

module.exports = router;
