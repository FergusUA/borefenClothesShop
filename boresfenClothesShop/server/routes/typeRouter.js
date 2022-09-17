const Router = require("express");
const router = new Router();
const typeController = require("../controllers/typeController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", roleMiddleware("ADMIN"), typeController.create);
router.get("/", typeController.getAll);
router.delete("/", typeController.delete);

module.exports = router;
