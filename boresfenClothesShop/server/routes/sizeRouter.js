const Router = require('express')
const router = new Router()
const sizeController = require('../controllers/sizeController')
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/', roleMiddleware("ADMIN"), sizeController.create)
router.get('/', sizeController.getAll)
router.delete('/', sizeController.delete)

module.exports = router