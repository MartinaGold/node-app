const redis = require('redis');
const config = require('../config');
const client = redis.createClient({port: config.dbPort});

class Database {
    constructor() {

    }

    connect() {
        return new Promise((resolve, reject) => {
            client.on("error", (err) => {
                console.log("Error " + err);
                reject();
            });
            client.on("connect", () => {
                resolve();
            });
        });
    }

    getCount() {
        return new Promise((resolve, reject) => {
            client.get('count', (err, reply) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }

    increaseCountBy(count) {
        return new Promise((resolve, reject) => {
            client.incrby('count', count, (err, newCount) => {
                    if(err) {
                        return reject(err);
                    }
                    resolve(newCount);
            });
        });

    }
}

module.exports = Database;
