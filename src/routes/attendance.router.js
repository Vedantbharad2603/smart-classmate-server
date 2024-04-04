const attendanceController = require('../controller/attendance.controller');
const express = require("express");
const router = express.Router();

router.post("/", attendanceController.create);
router.get("/", attendanceController.findAll);
router.get("/find/:id", attendanceController.findOne);
router.put("/update/:id", attendanceController.update);
router.get("/student/:id", attendanceController.findOne);
// router.delete("/:id", attendanceController.del);
module.exports = router;
