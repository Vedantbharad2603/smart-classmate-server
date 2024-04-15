const teacherdataController = require('../controller/teacherdata.controller');
const express = require("express");
const router = express.Router();

router.post("/", teacherdataController.create);
router.get("/", teacherdataController.findAll);
router.get("/find",teacherdataController.findOne);
router.put("/update", teacherdataController.update);
// router.delete("/:id", teacherdataController.del);
module.exports = router;
