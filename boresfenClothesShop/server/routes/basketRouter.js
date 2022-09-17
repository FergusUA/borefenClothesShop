const Router = require("express");
const router = new Router();
const BasketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, BasketController.addClothes);
router.get("/", authMiddleware, BasketController.getClothes);

module.exports = router;
