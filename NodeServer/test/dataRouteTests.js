
var server = require('../app.js');
var chai = require('chai');
var chaihttp = require('chai-http');
let should = chai.should();

chai.use(chaihttp);

//https://www.digitalocean.com/community/tutorials/test-a-node-restful-api-with-mocha-and-chai

//---------------------------------------------------
//              Test the data routes
//---------------------------------------------------

//PRIM data page test
//Should have a status of 200

describe("Tests the /GET PRIM DATA route", () => {
    it('It should display the primary data page.ejs', (done) => {
        chai.request(server)
            .get('/primary')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

//ECU data page test
//Should have a status of 200

describe("Tests the /GET ECU DATA route", () => {
    it('It should display the ecu data page.ejs', (done) => {
        chai.request(server)
            .get('/ecu')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

//inverter data page test
//Should have a status of 200

describe("Tests the /GET INV DATA route", () => {
    it('It should display the inverter data page.ejs', (done) => {
        chai.request(server)
            .get('/inverter')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

//accumulator data page test
//Should have a status of 200

describe("Tests the /GET ACC DATA route", () => {
    it('It should display the accumulator data page.ejs', (done) => {
        chai.request(server)
            .get('/accum')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

//position data page test
//Should have a status of 200

describe("Tests the /GET POS DATA route", () => {
    it('It should display the position data page.ejs', (done) => {
        chai.request(server)
            .get('/gps_map_1')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})


