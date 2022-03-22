const path = require('path');
const fs = require('fs/promises');

class Db {
    async getAllFlowers() {
        try {
            const data = await fs.readFile(path.join(__dirname, 'flowers.json'), 'utf8');

            return JSON.parse(data.toString());
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return []
        }
    }

    async getFlowerById(id) {
        try {
            const data = await fs.readFile(path.join(__dirname, 'flowers.json'), 'utf8');

            return JSON.parse(data.toString()).find(flower => flower.id === id);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return null
        }
    }

    async addFlower(flowerData) {
        try {
            const data = await fs.readFile(path.join(__dirname, 'flowers.json'), 'utf8');
            const flowers = JSON.parse(data.toString());

            await fs.writeFile(
                path.join(__dirname, 'flowers.json'),
                JSON.stringify([...flowers, flowerData]),
            )

            return flowerData;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err)
            return null;
        }
    }

    async getUserByEmail(email) {
        try {
            const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
            const users = JSON.parse(data.toString());

            return users.find((item) => item.email === email);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(err)
            return null;
        }
    }

    async saveOrder(order) {
        try {
            const data = await fs.readFile(path.join(__dirname, 'orders.json'), 'utf8');
            const orders = JSON.parse(data.toString());

            await fs.writeFile(
                path.join(__dirname, 'orders.json'),
                JSON.stringify([...orders, order]),
            )

            return order;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn(err)
            return null
        }
    }

    async getOrders() {
        try {
            const data = await fs.readFile(path.join(__dirname, 'orders.json'), 'utf8');

            return JSON.parse(data.toString());
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)

            return []
        }
    }
}

module.exports = new Db();
