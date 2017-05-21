const express = require('express');
const app = express();
const config = require('./config.js');
const bodyParser = require('body-parser');
const Database = require('./database/database');
const RouterController = require('./services/router-controller');
const db = new Database();

app.use(bodyParser.json());

app.post('/track', RouterController.handleTrack.bind(null, db));

app.get('/count', RouterController.handleCount.bind(null, db));

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

