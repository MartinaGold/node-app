const redis = require('redis');
const config = require('../config');

class Database {

    static connect() {
        this.client = redis.createClient({port: config.dbPort});
        return new Promise((resolve, reject) => {
            this.client.on("error", (err) => {
                console.log("Error " + err);
                reject();
            });
            this.client.on("connect", () => {
                resolve();
            });
        });
    }

    static getCount() {
        return new Promise((resolve, reject) => {
            this.client.get('count', (err, count) => {
                if (err) {
                    return reject(err);
                }
                resolve(count);
            });
        });
    }

    static increaseCountBy(count) {
        return new Promise((resolve, reject) => {
            this.client.incrby('count', count, (err, newCount) => {
                if (err) {
                    return reject(err);
                }
                resolve(newCount);
            });
        });
    }

}

module.exports = Database;
