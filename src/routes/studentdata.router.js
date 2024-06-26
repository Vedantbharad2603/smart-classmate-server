const studentdataController = require('../controller/studentdata.controller');
const express = require("express");
const router = express.Router();

router.post("/", studentdataController.addstud);
router.get("/", studentdataController.findAll);
router.get("/getstud", studentdataController.getStudentWithActive_Course);

router.post("/find",studentdataController.findOne);
router.put("/update", studentdataController.update);
// router.delete("/:id", studentdataController.del);
module.exports = router;
