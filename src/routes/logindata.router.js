const logindataController = require('../controller/logindata.controller');
const express = require("express");
const router = express.Router();

router.post("/", logindataController.create);
router.get("/", logindataController.findAll);
router.get("/find/:id", logindataController.findOne);
router.post("/check", logindataController.check);
router.put("/change/:id", logindataController.changeUserStatus);
router.put("/update/:id", logindataController.updatelogin);
// router.delete("/:id", logindataController.del);
module.exports = router;
