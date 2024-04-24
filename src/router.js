const express = require("express");
const router = express.Router();
const ContactController = require('./controllers/contact');

router.get("/", ContactController.getAll);
router.post("/create", ContactController.create);

module.exports = router;