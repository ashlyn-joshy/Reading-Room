const express = require("express");
const router = express.Router();

//controller
const bookController = require("../controllers/book");
//Authentication
const adminAuth = require("../middleware/adminAuth");

router.get('/',bookController.getAllBooks);
router.get('/:id', bookController.getBookDetails);

router.post('/',adminAuth, bookController.createBook);
router.put('/:id/update',adminAuth, bookController.updateBook);
router.delete('/:id/delete',adminAuth, bookController.deleteBook);
router.put('/:id/addBadgesToBook',adminAuth, bookController.addBadgesToBook);
router.put('/:id/removeBadgesFromBook',adminAuth, bookController.removeBadgesFromBook);
router.put('/:id/changeBookCategory',adminAuth, bookController.changeBookCategory)

module.exports = router;