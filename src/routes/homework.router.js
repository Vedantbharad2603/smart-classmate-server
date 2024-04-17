const attendanceController = require('../controller/homework.controller');
const express = require("express");
const router = express.Router();

router.post("/", attendanceController.create);
router.get("/", attendanceController.findAll);
router.get("/find/:id", attendanceController.findOne);
router.put("/update", attendanceController.update);
router.post("/studentall", attendanceController.giveStudentAllhomework);
router.get("/checkwork", attendanceController.checkwork);
router.get("/student/:id", attendanceController.findOne);
// router.delete("/:id", attendanceController.del);
module.exports = router;
