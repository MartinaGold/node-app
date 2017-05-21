const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const RouterController = require('../services/router-controller');
const config = require('../config');

chai.use(chaiHTTP);

const serverURL = 'http://localhost:' + config.httpPort;

describe('RouterController', () => {

    describe('handleTrack', () => {

        it('should received 422 http status code without count in body', () => {
            chai.request(serverURL)
                .post('/track')
                .send({foo: '123', bar: {}})
                .end((err, res) => {
                    expect(err).to.be.object;
                    expect(res).to.have.status(422);
                });
        });

        it('should received 500 http status code with incorrect count in body', () => {
            chai.request(serverURL)
                .post('/track')
                .send({count: {}, bar: {}})
                .end((err, res) => {
                    expect(err).to.be.object;
                    expect(res).to.have.status(500);
                });
        });

        it('should received 200 http status code with correct count in body', () => {
            chai.request(serverURL)
                .post('/track')
                .send({count: 4, bar: {}})
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                });
        });

    });

    describe('handleCount', () => {

        it('should received 200 http status code', () => {
            chai.request(serverURL)
                .get('/count')
                .send()
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                });

        });
    });

});