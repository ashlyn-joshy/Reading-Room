const express = require("express");
const router = express.Router();

//controller
const bookController = require("../controllers/book");

router.post('/', bookController.createBook);

module.exports = router;