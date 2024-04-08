const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const multer  = require('multer')
const path = require('path');

//functiion using multer to save the image on the backend 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const itemName = (file.originalname??"Unknown")+ "_" + Date.now();
        const ext = path.extname(file.originalname);
      cb(null, `${itemName}${ext}`)
    }
  })
  
const upload = multer({ storage: storage });

router.route("/admin").get(admin.getClothes);
router.route("/admin/deleteCloth").delete(admin.deleteCloth);
router.route("/admin/updateCloth").put( admin.updateCloth);
router.route("/admin/getCloth/:id").get(admin.getCloth);
router.route("/admin/postCloth").post(upload.single('image'), admin.postCloth);

router.route("/admin/getUsers").get(admin.getUsers);
router.route("/admin/getUser/:id").get(admin.getUser);

module.exports = router;