const express = require("express");
const router = express.Router();

//controller
const bookController = require("../controllers/book");

router.post('/', bookController.createBook);
router.get('/:id', bookController.getBookDetails);
router.put('/:id/update', bookController.updateBook);

module.exports = router;