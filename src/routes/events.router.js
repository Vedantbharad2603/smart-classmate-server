const eventsController = require('../controller/events.controller');
const express = require("express");
const router = express.Router();

router.post("/", eventsController.create);
router.get("/", eventsController.findAll);
router.get("/upcoming", eventsController.upcomingEvent);
router.get("/upcomingOne", eventsController.upcomingEventOne);
router.post("/find/:id", eventsController.findOne);
router.put("/update/:id", eventsController.update);
// router.delete("/:id", eventsController.del);
module.exports = router;
