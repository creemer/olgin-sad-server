const uuid = require('uuid')
const ApiError = require('../error/ApiError');
const db = require('../db/index');

class OrderController {
    async addOrder(req, res, next) {
        try {
            const order = await db.saveOrder({
                id: uuid.v4(),
                createdAt: Date.now(),
                ...req.body
            })

            res.json(order);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('addOrder', err);
            next(ApiError.badRequest(err.message))
        }

    }

    async getOrders(req, res, next) {
        try {
            const orders = await db.getOrders();

            res.json(orders);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('getOrders', err);
            next(ApiError.badRequest(err.message))
        }

    }
}

module.exports = new OrderController();
