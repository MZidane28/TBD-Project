const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getBook);
router.post("/", controller.addBook);
router.get("/:bookid", controller.getBookByBookId);
router.put("/:bookid", controller.updateBook);
router.delete("/:bookid", controller.removeBook);

module.exports = router;
