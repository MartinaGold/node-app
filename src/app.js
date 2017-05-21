const express = require('express');
const app = express();
const config = require('./config.js');
const bodyParser = require('body-parser');
const db = require('./database/database');
const RouterController = require('./services/router-controller');

app.use(bodyParser.json());

app.post('/track', RouterController.handleTrack);

app.get('/count', RouterController.handleCount);

Promise.all([db.connect(), app.listen(config.httpPort)])
    .then(initialize)
    .catch(handleError);

function initialize() {
    console.log(`Database is ready on port: ${config.dbPort}`);
    console.log(`Im listen on port: ${config.httpPort}`);
}

function handleError(err) {
    console.log(err);
}

