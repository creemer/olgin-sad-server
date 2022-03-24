const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError');
const { db, storage } = require('../db/index');

class FlowerController {
    async create(req, res, next) {
        try {
            let {name, price, description, category} = req.body
            const {img} = req.files
            const id = uuid.v4();
            let fileName = id + ".jpg"

            await storage.saveImage(fileName, img.data);

            const flower = await db.addFlower({
                id, name, price, description, category,
                img: `https://firebasestorage.googleapis.com/v0/b/olgin-sad.appspot.com/o/${fileName}?alt=media`
            })

            return res.json(flower)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getFlowers(req, res) {
        const category = req.query.category;

        let flowers;

        if (!category || category === 'all') {
            flowers = await db.getAllFlowers();
        } else {
            flowers = await db.getFlowerByCategory(category);
        }

        return res.json(flowers);
    }

    async getOne(req, res) {
        const {id} = req.params
        const flower = await db.getFlowerById(id);

        if (!flower) {
            res.status(400).json('Nothing found')
        }

        return res.json(flower[0])
    }
}

module.exports = new FlowerController()
