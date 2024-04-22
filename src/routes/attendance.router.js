const attendanceController = require('../controller/attendance.controller');
const express = require("express");
const router = express.Router();

router.post("/", attendanceController.create);
router.get("/", attendanceController.findAll);
// router.get("/find/:id", attendanceController.findOne);
router.put("/update", attendanceController.update);
router.get("/getToday", attendanceController.getToday);

router.get("/student", attendanceController.findOne);
router.get("/givetoday", attendanceController.makeattendance);
// router.delete("/:id", attendanceController.del);
module.exports = router;
