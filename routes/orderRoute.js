const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/addOrder', orderController.addOrder)
router.get('/', checkRole('ADMIN'), orderController.getOrders)

module.exports = router
