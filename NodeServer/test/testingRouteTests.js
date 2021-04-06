var server = require('../app.js');
var chai = require('chai');
var chaihttp = require('chai-http');
let should = chai.should();
var expect = chai.expect;
var chaiFiles = require('chai-files');

chai.use(chaihttp);
chai.use(chaiFiles);

var file = chaiFiles.file;
var dir = chaiFiles.dir;

describe("Tests the /GET /testing", () => {
    it('It should display the page for starting and stopping test script', (done) => {
        chai.request(server)
            .get('/testing')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

describe("Tests the /GET /testing/start", () => {
    it('This should test the start script route', (done) => {
        chai.request(server)
            .post('/testing/start')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

describe("Tests the /GET /testing/stop", () => {
    it('This should test the stop script route', (done) => {
        chai.request(server)
            .post('/testing/stop')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    })
})

describe("Tests the /GET /start-data-session", () => {
    it('This should test to see if the data.csv files exist and that they are emptied', function (done) {
        chai.request(server)
            .get('/start-data-session')
            .end((err, res) => {
                res.should.have.status(200);
                //Check that the files exist. 
                expect(file('./public/data.csv')).to.exist;
                expect(file('./public/Accum_data.csv')).to.exist;
                expect(file('./public/ECU_data.csv')).to.exist;
                expect(file('./public/Inverter_data.csv')).to.exist;
                expect(file('./public/Position_data.csv')).to.exist;
                //Check that the files contain ' ' (empty)
                expect(file('./public/data.csv')).to.equal(' ');
                expect(file('./public/Accum_data.csv')).to.equal(' ');
                expect(file('./public/ECU_data.csv')).to.equal(' ');
                expect(file('./public/Inverter_data.csv')).to.equal(' ');
                expect(file('./public/Position_data.csv')).to.equal(' ');
                done();
            })
    })
})


//Add a couple of tests where the test data is supplied and then tested
