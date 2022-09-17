const Router = require('express')
const router = new Router()
const clothesRouter = require('./clothesRouter')
const userRouter = require('./userRouter')
const sizeRouter = require('./sizeRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/size', sizeRouter)
router.use('/clothes', clothesRouter)

module.exports = router