var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);

// API is LIVE
describe("Check if SERVER is LIVE", function(){
    it("should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/patients')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// GET request for patients
describe("when we issue a 'GET' get request for  /patients", function(){
    it("Shows patient list | and should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/patients')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//GET request for patient by id
describe("when we issue a 'GET' get request for  /patients/:id", function(){
    it("Shows single patient | and should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/patients/5fbfac5b731db00004e2c622')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//GET request for vitals
describe("when we issue a 'GET' get request for  /patients/:id", function(){
    it("Shows all records | and should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/patients/records')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//GET request for record by ID
describe("when we issue a 'GET' get request for  /patients/:id/records", function(){
    it("Shows single patient records | and should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/patients/5fbfac5b731db00004e2c622/records')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//GET request for vitals
describe("when we issue a 'GET' get request for  /patients/:patientId/records/:id", function(){
    it("Shows single patient single record | and should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/patients/5fa98f543c729226dfd00199/records/5faab6d3271ff9057c2419a6')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// GET request to validate user password
describe("when we issue a 'GET' get request for /users/:username/:password", function(){
    it("Validates user | and should return HTTP 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .get('/users/testchai/testchai')
            .end(function(req, res){
                expect(res.status).to.equal(200);
                done();
            });
    });
});