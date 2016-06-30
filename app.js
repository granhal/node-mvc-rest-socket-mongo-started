/**
 * Created by alberto on 22/3/16.
 */

var mongoose = require('mongoose');
var USERS = mongoose.model('users');

//GET - Return all users in the DB
exports.findAll = function(req, res) {
    USERS.find(function(err, users) {
        if(err) return res.status(500).send(err.message);
        console.log('GET /users');
        res.status(200).jsonp(users);
    });
};

//GET - Return for ID
exports.findById = function(req, res) {
    USERS.findById(req.params.id, function(err, user) {
        if(err) return res.status(500).send(err.message);
        console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//POST - Add new user
exports.addUser = function(req, res) {

    var user = new USERS({
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        birthdate: req.body.birthdate,
        address: req.body.address,
        telephoneNumber: req.body.telephoneNumber,
        email: req.body.email
    });

    user.save(function(err, user) {
        if(err) return res.status(500).send( err.message);
        console.log('POST /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
    USERS.findById(req.params.id, function(err, user) {
        user.name   = req.body.name;
        user.surname    = req.body.surname;
        user.dni = req.body.dni;
        user.birthdate  = req.body.birthdate;
        user.address = req.body.address;
        user.telephoneNumber   = req.body.telephoneNumber;
        user.email = req.body.email;

        user.save(function(err) {
            if(err) return res.status(500).send(err.message);
            console.log('PUT /user/' + req.params.id);
            res.status(200).jsonp(user);
        });
    });
};

//DELETE - Delete a user with specified ID
exports.deleteUser = function(req, res) {
    USERS.findById(req.params.id, function(err, user) {
        if(user) {
            user.remove(function (err) {
                if (err) return res.status(500).send(err.message);
                console.log('DELETE /user/' + req.params.id);
                res.status(200).send();
            })
        }
    });
};

console.log("user controller is loaded");