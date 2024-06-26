const logindataController = require('../controller/logindata.controller');
const express = require("express");
const router = express.Router();

router.post("/", logindataController.create);
router.get("/", logindataController.findAll);
router.get("/getTeacher", logindataController.findteacher);
router.get("/getStudent", logindataController.findstudent);
router.get("/getStudentCount", logindataController.studCount);
router.post("/find", logindataController.findOne);
router.post("/username", logindataController.findOnebyusername);
router.post("/check", logindataController.check);
router.post("/getStudProfile", logindataController.getStudinfo);
router.post("/getStudProfileWithAllCourse", logindataController.getStudinfo2);
router.put("/change", logindataController.changeUserStatus);
router.put("/changeType", logindataController.changeType);
router.put("/update", logindataController.updatelogin);
// router.delete("/:id", logindataController.del);
module.exports = router;
