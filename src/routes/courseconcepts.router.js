const courseconceptsController = require('../controller/courseconcepts.controller');
const express = require("express");
const router = express.Router();

router.post("/", courseconceptsController.create);
router.get("/", courseconceptsController.findAll);
router.post("/getconcepts",courseconceptsController.getconcepts);
router.get("/find",courseconceptsController.findOne);
router.put("/update", courseconceptsController.update);
// router.delete("/:id", courseconceptsController.del);
module.exports = router;
