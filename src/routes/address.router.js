const addressController = require('../controller/address.controller');
const express = require("express");
const router = express.Router();

router.post("/", addressController.create);
router.get("/", addressController.findAll);
router.get("/find/:id", addressController.findOne);
router.put("/update/:id", addressController.update);
// router.delete("/:id", addressController.del);
module.exports = router;
