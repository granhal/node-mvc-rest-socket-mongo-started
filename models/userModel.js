/**
 * Created by alberto on 21/3/16.
 */

exports = module.exports = function(mongoose) {

    var users = new mongoose.Schema({
        date: {
            type: Date,
            default: Date.now
        },
        name: String,
        surname: String,
        dni: String,
        birthdate: Date,
        address: String,
        telephoneNumber: Number,
        email: String
    });

    mongoose.model('users', users);
    console.log("schema users created");
};