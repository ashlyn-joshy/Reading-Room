const express = require("express");
const router = express.Router();

//controller
const bookController = require("../controllers/book");

router.post('/', bookController.createBook);
router.get('/:id', bookController.getBookDetails);

module.exports = router;