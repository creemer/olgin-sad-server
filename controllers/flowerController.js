const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');
const db = require('../db/index');

class FlowerController {
    async create(req, res, next) {
        try {
            let {name, price, description} = req.body
            const {img} = req.files
            const id = uuid.v4();
            let fileName = id + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const flowerData = {id, name, price, description, img: fileName};
            await db.addFlower(flowerData)

            return res.json(flowerData)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        const flowers = await db.getAllFlowers();

        return res.json(flowers);
    }

    async getOne(req, res) {
        const {id} = req.params
        const flower = await db.getFlowerById(id);

        return res.json(flower)
    }
}

module.exports = new FlowerController()
