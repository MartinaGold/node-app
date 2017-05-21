const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../database/database');

describe('Database', () => {

    before(() => {
        db.connect();
    });

    describe('getCount', () => {
        it('should be resolved', (done) => {
            db.getCount().then(() => {
                done();
            });
        });
    });

    describe('increaseCountBy', () => {
        const number = 10;

        it('should increase by given number', (done) => {
            db.getCount().then((currentCount) => {
                const count = parseFloat(currentCount) || 0;
                db.increaseCountBy(number).then((newCount) => {
                    expect(newCount).to.equal(count + number);
                    done();
                })
            });
        })
    });

});