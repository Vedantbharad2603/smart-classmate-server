const timetabledataController = require('../controller/timetable.controller.js');
const express = require("express");
const router = express.Router();

router.post("/", timetabledataController.create);
router.get("/find", timetabledataController.findOne);
router.get("/", timetabledataController.findAll);
router.put("/update", timetabledataController.update);

module.exports = router;
