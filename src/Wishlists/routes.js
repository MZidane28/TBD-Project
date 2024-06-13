const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getWishlists);
router.get("/:customerid", controller.getWishlistsByCustomerId);
router.post("/", controller.addWishlists);
router.delete("/:wishlistid", controller.removeWishlists);
router.put("/:customerid", controller.updateWishlists);

module.exports = router;
