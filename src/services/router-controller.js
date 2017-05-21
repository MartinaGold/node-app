const fs = require('fs');
const config = require('../config.js');

class RouterController {

    static handleTrack(db, request, response) {
        const count = request.body.count;
        const jsonString = JSON.stringify(request.body);
        if (count) {
            if (!isNaN(count)) {
                increaseCountAndAppendToFile(db, request, jsonString).then(() => {
                    response.status(200).json();
                }).catch((err) => {
                    console.log(err);
                    response.status(500).json('Something is wrong');
                });
            } else {
                response.status(500).json('Count has to be number');
            }
        } else {
            response.status(422).json('Count is missing in body');
            appendToFile(config.logsPath, jsonString)
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    static handleCount(db, request, response) {
        db.getCount().then((count) => {
            response.status(200).json(count);
        }).catch((err) => {
            console.log(err);
            response.status(500).json('Do not get count')
        })
    }

}

function increaseCountAndAppendToFile(db, request, jsonString) {
    return Promise.all([db.increaseCountBy(request.body.count), appendToFile(config.logsPath, jsonString)])
}

function appendToFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        })
    });
}

module.exports = RouterController;