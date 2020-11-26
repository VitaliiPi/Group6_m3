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

//POST request for vitals
describe("when we issue a 'POST' to /patients/:id/records", function(){
    it("Adds new vitals to patient | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .post('/patients/5fbfaca2731db00004e2c623/records')
            .send({
                "patient_id":"5fbfaca2731db00004e2c623",
                "bloodPressure":"chaitest",
                "respiratoryRate":"mochatest",
                "bloodOxigen":"99",
                "heartRate":"80",
                "date": 2020
                })
            .end(function(req, res)
            {
                
                
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// POST request to add new user
describe("when we issue a 'POST' to /users", function(){
    it("Adds new user | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .post('/users')
            .send({
                "username":"chaitest1111",
                "password":"chaitest1111",
                "email":"chai@mocha22.test"
                  })
            .end(function(req, res)
            {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//PUT(update) request for patients
describe("when we issue a 'PUT' to /patients/:id", function(){
    it("Updates patient info | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .put('/patients/5fbfaca2731db00004e2c623')
            .send({
                "user_id": "chai mocha test",
                "name": "CHANGED",
                "phone_number": "333333",
                "room": "C311",
                "address": "190 Progress Ave",
                "notes": "NEW UPDATED TEST",
                "in_critical_condition": true
            })
            .end(function(req, res)
            {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//PUT(update) request for vitals
describe("when we issue a 'PUT' to /patients/:id", function(){
    it("Updates patient vitals | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .put('/patients/5fbfaca2731db00004e2c623')
            .send({
                "user_id": "chai mocha test",
                "name": "CHANGED",
                "phone_number": "333333",
                "room": "C311",
                "address": "190 Progress Ave",
                "notes": "NEW UPDATED TEST",
                "in_critical_condition": true
            })
            .end(function(req, res)
            {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

//PUT(update) request to flag critical patients
describe("when we issue a 'PUT' to /patients/:id", function(){
    it("Updates patient condition | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .put('/patients/5fbfaca2731db00004e2c623')
            .send({
                "in_critical_condition": true
            })
            .end(function(req, res)
            {
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// DELETE request for patients
describe("when we issue a 'DELETE' to /patients/:id", function(){
    it("Deletes patient | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .del('/patients/5fbfabc9731db00004e2c620')
            .end(function(req, res)
            {
                //console.log("Response: " + JSON.stringify(res))
        
                expect(res.status).to.equal(200);
                done();
            });
    });
});

// DELETE request for patients single record
describe("when we issue a 'DELETE' to /patients/:id/records/:id", function(){
    it("Deletes patient single record | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .del('/patients/5fbfabc9731db00004e2c620/records/5fbfc49d1e13620004f2fec6')
            .end(function(req, res)
            {
                //console.log("Response: " + JSON.stringify(res))
        
                expect(res.status).to.equal(200);
                done();
            });
    });
});


// DELETE request for all records of a patient
describe("when we issue a 'DELETE' to /patients/:id/records", function(){
    it("Deletes all records for single patient | and should return 200", function(done) {
        chai.request('https://patientrecordsgroup.herokuapp.com')
            .del('/patients/5fbfabc9731db00004e2c620/records')
            .end(function(req, res)
            {
                //console.log("Response: " + JSON.stringify(res))
        
                expect(res.status).to.equal(200);
                done();
            });
    });
});