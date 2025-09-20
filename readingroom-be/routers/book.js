const express = require("express");
const router = express.Router();

//controller
const bookController = require("../controllers/book");

router.post('/', bookController.createBook);
router.get('/:id', bookController.getBookDetails);
router.put('/:id/update', bookController.updateBook);
router.delete('/:id/delete', bookController.deleteBook);
router.get('/',bookController.getAllBooks);
router.put('/:id/addBadgesToBook', bookController.addBadgesToBook);
router.put('/:id/removeBadgesFromBook', bookController.removeBadgesFromBook);
router.put('/:id/changeBookCategory', bookController.changeBookCategory)

module.exports = router;