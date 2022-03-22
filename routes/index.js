const Router = require('express')
const router = new Router()
const flowerRouter = require('./flowerRouter')
const userRouter = require('./userRouter')
const orderRouter = require('./orderRoute')

router.use('/user', userRouter)
router.use('/flowers', flowerRouter)
router.use('/order', orderRouter)

module.exports = router
