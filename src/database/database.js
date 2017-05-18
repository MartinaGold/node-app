const redis = require('redis');
const config = require('../config');


class Database {
    constructor() {

    }

    connect() {
        return new Promise((resolve, reject) => {
            const client = redis.createClient({port: config.dbPort});
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

    }

    increaseCountBy(count) {

    }
}

module.exports = Database;
