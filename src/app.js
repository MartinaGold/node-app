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
    console.log(request.body);
    if (request.body.count) {
        increaseCountAndAppendToFile(request, response, jsonString);
    } else {
        appendToFile('./logs/logs', jsonString);
    }
});

app.get('/count', (request, response) => {
    db.getCount().then((reply) => {
        response.status(200).json(reply);
    }).catch((err) => {
        console.log(err);
        response.status(500).json('Do not get count')
    })
});

function increaseCountAndAppendToFile(request, response, jsonString) {
    Promise.all([db.increaseCountBy(request.body.count), appendToFile('./logs/logs', jsonString)])
        .then(() => {
            response.status(200).json();
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json('Something is wrong');
        });
}


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