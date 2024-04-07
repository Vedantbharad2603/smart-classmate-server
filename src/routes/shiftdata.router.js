const shiftdataController = require('../controller/shiftdata.controller');
const express = require("express");
const router = express.Router();

router.post("/", shiftdataController.create);
router.get("/", shiftdataController.findAll);
router.get("/find",shiftdataController.findOne);
router.put("/update", shiftdataController.update);
// router.delete("/:id", shiftdataController.del);
module.exports = router;
