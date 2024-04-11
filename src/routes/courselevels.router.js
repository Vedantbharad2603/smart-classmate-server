const courselevelsController = require('../controller/courselevels.controller');
const express = require("express");
const router = express.Router();

router.post("/", courselevelsController.create);
router.get("/", courselevelsController.findAll);
router.get("/find",courselevelsController.findOne);
router.put("/update", courselevelsController.update);
// router.delete("/:id", courselevelsController.del);
module.exports = router;
