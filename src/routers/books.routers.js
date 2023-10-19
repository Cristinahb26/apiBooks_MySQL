const {Router} = require("express");
const router = Router();
const booksCtrl = require ("../controller/books.controller");

router.get("/book", booksCtrl.getBook);
router.get("/bookId", booksCtrl.getBookId);
router.post("/book", booksCtrl.postBook);
router.put("/book", booksCtrl.putBook);
router.delete("/book", booksCtrl.deleteBook);


module.exports = router;