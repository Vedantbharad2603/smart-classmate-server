const eventsController = require('../controller/holidays.controller');
const express = require("express");
const router = express.Router();

router.post("/", eventsController.create);
router.get("/", eventsController.findAll);
router.get("/upcoming", eventsController.Upcomingholiday);
router.get("/find/:id", eventsController.findOne);
router.put("/status/:id", eventsController.changeStatus);
router.put("/update", eventsController.update);
// router.delete("/:id", eventsController.del);
module.exports = router;
