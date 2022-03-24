const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = process.env.SERVICE_ACCOUNT || require('../keys/olgin-sad-firebase-admin-service-key.json');

initializeApp({
    credential: cert(serviceAccount),
    storageBucket: 'olgin-sad.appspot.com'
});

const db = getFirestore();
const bucket = getStorage().bucket();

class FirebaseDB {
    async getAll(collectionName) {
        const snapshot = await db.collection(collectionName).get();
        const data = [];
        snapshot.forEach((doc) => data.push(doc.data()));

        return data;
    }

    async getByField(collectionName, field, value) {
        const ref = db.collection(collectionName);
        const snapshot = await ref.where(field, '==', value).get();

        if (snapshot.empty) {
            console.log('No matching documents in getByField');
            return;
        }

        const data = []
        snapshot.forEach(doc => data.push(doc.data()));
        return data;
    }

    async add(collectionName, data) {
        return await db.collection(collectionName).add(data);
    }
}

class FirebaseStorage {
    async save(destFileName, data) {
        try {
            return await bucket.file(destFileName).save(data);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('In storage.save', err);
        }
    }
}

module.exports = {
    db: new FirebaseDB(),
    storage: new FirebaseStorage()
}
