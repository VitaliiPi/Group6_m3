require('dotenv').config();
var restify = require('restify');
var bcrypt = require('bcrypt');
var server = restify.createServer();

// Load the Mongoose module and Schema object
var mongoose = require('mongoose');


var saltRound = 10;
var Schema = mongoose.Schema;
var PORT = process.env.PORT;
var HOST = process.env.IP;

//connection string, we chose Mongo DB Atlas cloud
var uristring = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.b8raf.mongodb.net/PatientRecordsDB?retryWrites=true&w=majority';

// vitalii local mongodb testing
// var uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/PatientClinicalDatabase';

mongoose.connect(uristring, function(err, res){
    if (err){
        console.log('ERROR connecting to: ' + uristring + ', ' + err);
    }else{
        console.log ('Successfully connected to: ' + uristring);
    }
});

server.use(restify.plugins.bodyParser({ mapParams: false }));

server.listen(PORT, HOST, function() {
  console.log(`Server ${server.name} listening at ${server.url}`)
  console.log('Endpoints:');
  console.log('%s/patients method: GET, POST', server.url);
  console.log('%s/patients/:id method: PUT, GET', server.url);
  console.log('%s/patients/:id/:isCritical method:PUT', server.url);
  console.log('%s/records method: GET, POST', server.url);
  console.log('%s/records/:id method: PUT', server.url);
});

// GET request for patients
server.get('/patients', getPatients);

//GET request for patient by id
server.get('/patients/:id', findPatientById);

//GET request for vitals
server.get('/patients/records', getVitals);

//GET request for record by ID
server.get('/patients/:id/records', findRecordByPatientId);

//GET request for vitals
server.get('/patients/:patientId/records/:id', getOnePatientRecord);

// GET request to validate user password
server.get('/users/:username/:password', validateUser);

// POST request for patients
server.post('/patients', addNewPatient);

//POST request for vitals
server.post('/patients/:id/records', addNewRecord);

// POST request to add new user
server.post('/users', addNewUser);

//PUT(update) request for patients
server.put('/patients/:id', editPatient);

//PUT(update) request for vitals
server.put('/patients/:patientId/records/:id', editPatientRecord);

//PUT(update) request to flag critical patients
server.put('/patients/:id/:isCritical', flagCriticalPatient);

// DELETE request for patients
server.del('/patients/:id', deletePatient);

// DELETE request for all records of a patient
server.del('/patients/:id/records', deleteVitals);

// DELETE request for patients
server.del('/patients/:patientId/records/:id', deleteRecord);

// Define a new 'UserSchema'
var UserSchema = new Schema({
    "username": {
        type: String,
        unique: true
    }, 
    "password": String,
    "email": String
},
{
    versionKey: false
});

// Define a new 'PatientSchema'
var PatientSchema = new Schema({
    "user_id": String,
    "name": String, 
    "phone_number": String,
    "room": String,
    "address": String,  
    "notes": String, 
    "in_critical_condition": Boolean
},
{
    versionKey: false
});

// Define a new 'VitalsSchema'
var VitalSchema = new Schema({
    "patient_id": String,
    "bloodPresure": String,
    "respiratoryRate": String,
    "bloodOxigen": String,
    "hearthRate": String,
    "date": Date
},
{
    versionKey: false
});


// Create models out of the schemas
var User = mongoose.model('User', UserSchema);
var Patient = mongoose.model('Patient', PatientSchema);
var Record = mongoose.model('Vitals', VitalSchema);



function getPatients(req, res, next){
    Patient.find({}, function (err, patients) {
        if (err) {
            return next(err);
        } else {
            res.json(patients);
        }
    });
}

function getVitals(req, res, next){
    Record.find({}, function (err, records) {
        if (err) {
            return next(err);
        } else {
            res.json(records);
        }
    });
}

function addNewPatient(req, res, next) {
    var newPatient = new Patient(req.body);
    // Use the 'Patient' instance's 'save' method to save a new patient information
    newPatient.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(newPatient);
        }
    });
}

function deletePatient(req, res, next){
    Patient.findOneAndDelete( {_id: req.params.id}, function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.params.id);
        }
    });

}

function deleteVitals(req, res, next){
    Record.deleteMany({ patient_id: req.params.id}, function (err) {
        if (err){
            return next(err);
        }
        else{
            res.json(req.params.id);
        }
    });
}

function deleteRecord(req, res, next){
    Record.findOneAndDelete({ _id: req.params.id}, function (err) {
        if (err){
            return next(err);
        }
        else{
            res.json(req.params.id);
        }
    });
}

function addNewRecord(req, res, next) {
    req.body.patient_id = req.params.id;
    var newRecord = new Record(req.body);
    // Use the 'Patient' instance's 'save' method to save a new patient information
    newRecord.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(newRecord);
        }
    });
}

function editPatient(req, res, next) {
    Patient.findByIdAndUpdate( req.params.id, req.body, function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.body);
        }
    });
}

function editPatientRecord(req, res, next) {
    Record.findByIdAndUpdate( req.params.id, req.body, function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.body);
        }
    });
}

function flagCriticalPatient(req, res, next) {
    Patient.findByIdAndUpdate( req.params.id, {"in_critical_condition": req.params.isCritical}, function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.body);
        }
    });
}

function findPatientById(req, res, next) {
    Patient.findById( req.params.id, function (err, patients) {
        if (err) {
            return next(err);
        } else {
            res.json(patients);
        }
    });
}

function getOnePatientRecord(req, res, next) {
    Record.findById( req.params.id, function (err, records) {
        if (err) {
            return next(err);
        } else {
            res.json(records);
        }
    });
}


function findRecordByPatientId(req, res, next) {
    console.log("vitals of patient", req.params.id);
    Record.find( { patient_id: req.params.id }, function (err, records) {
        if (err) {
            return next(err);
        } else {
            res.json(records);
        }
    });
}

function addNewUser(req, res, next){
    bcrypt.genSalt(saltRound, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.body.password = hash;
            var newUser = new User(req.body);
            newUser.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json(newUser);
                }
            });
        });
    });    
}

function validateUser(req, res, next){
    console.log(req.params.username)
    User.find( { username: req.params.username }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            if (user.length > 0){
                bcrypt.compare(req.params.password, user[0].password, function(err, result) {
                    if (result == true){
                        console.log(user[0]._id)
                        res.json({'validated':'true', "user_id":user[0]._id});
                    }
                    else{
                        res.json({'validated':'false'});
                    }
                });
            }
            else{
                res.json({'validated':'false'});
            }           
        }
    });
}
