const courseenrollmentController = require('../controller/courseenrollment.controller');
const express = require("express");
const router = express.Router();

router.post("/", courseenrollmentController.create);
router.get("/", courseenrollmentController.findAll);
router.get("/find",courseenrollmentController.findOne);
router.put("/update", courseenrollmentController.update);
// router.delete("/:id", courseenrollmentController.del);
module.exports = router;
