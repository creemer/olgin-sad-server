
const fireBase = require('./firebase');

class Db {
    async getAllFlowers() {
        try {
            return await fireBase.db.getAll('flowers');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return []
        }
    }

    async getFlowerById(id) {
        try {
            return await fireBase.db.getByField('flowers', 'id', id);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return null
        }
    }

    async getFlowerByCategory(category) {
        try {
            const flowers =  await fireBase.db.getByField('flowers', 'category', category);

            if (!flowers || !flowers.length) {
                return []
            } else {
                return flowers
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return []
        }
    }

    async addFlower(flowerData) {
        try {
            return await fireBase.db.add('flowers', flowerData);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err)
            return null;
        }
    }

    async getUserByEmail(email) {
        try {
            const found = await fireBase.db.getByField('users', 'email', email);

            if (found.length) {
                return found[0];
            } else {
                return null;
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(err)
            return null;
        }
    }

    async saveOrder(order) {
        try {
            return await fireBase.db.add('orders', order);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(err)
            return null
        }
    }

    async getOrders() {
        try {
            return await fireBase.db.getAll('orders');
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return []
        }
    }
}

class Storage {
    async saveImage(name, img) {
        return await fireBase.storage.save(name, img);
    }
}

module.exports = {
    db: new Db(),
    storage: new Storage()
}
