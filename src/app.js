const express = require('express');
const app = express();
const config = require('./config.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const Database = require('./database/database');

const db = new Database();

app.use(bodyParser.json());

app.post('/track', (request, response) => {
    const jsonString = JSON.stringify(request.body);

    appendToFile('./logs/logs', jsonString).then(() => {
        response.status(200).send('Everything is OK');
    }).catch((err) => {
        console.log(err);
        response.status(500).send('Something is wrong');
    });
});

Promise.all([db.connect(), app.listen(config.httpPort)])
    .then(initialize)
    .catch(handleError);

function initialize() {
    console.log(`Database is ready on port: ${config.dbPort}`);
    console.log(`Im listen on port ${config.httpPort}`);
}

function handleError(err) {
    console.log(err);
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