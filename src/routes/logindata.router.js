const logindataController = require('../controller/logindata.controller');
const express = require("express");
const router = express.Router();

router.post("/", logindataController.create);
router.get("/", logindataController.findAll);
router.get("/getTeacher", logindataController.findteacher);
router.get("/find/:id", logindataController.findOne);
router.post("/username", logindataController.findOnebyusername);
router.post("/check", logindataController.check);
router.put("/change", logindataController.changeUserStatus);
router.put("/changeType", logindataController.changeType);
router.put("/update/:id", logindataController.updatelogin);
// router.delete("/:id", logindataController.del);
module.exports = router;
