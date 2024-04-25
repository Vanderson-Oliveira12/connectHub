const express = require("express");
const router = express.Router();
const ContactController = require('./controllers/contact');

router.get("/", ContactController.getAll);
router.post("/create", ContactController.create);
router.put("/update/:id", ContactController.update);
router.delete("/delete/:id", ContactController.delete);

module.exports = router;