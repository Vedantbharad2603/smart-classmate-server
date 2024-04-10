const coursesController = require('../controller/courses.controller');
const express = require("express");
const router = express.Router();

router.post("/", coursesController.create);
router.get("/", coursesController.findAll);
router.get("/find",coursesController.findOne);
router.put("/update", coursesController.update);
// router.delete("/:id", coursesController.del);
module.exports = router;
