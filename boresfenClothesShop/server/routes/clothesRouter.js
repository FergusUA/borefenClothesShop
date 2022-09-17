const Router = require('express')
const router = new Router()
const clothesController = require('../controllers/clothesController')
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/', roleMiddleware("ADMIN"), clothesController.create)
router.get('/', clothesController.getAll)
router.get('/:id', clothesController.getOne)
router.delete('/', clothesController.delete)

module.exports = router