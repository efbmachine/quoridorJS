var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        index: true
    },
    password: {
        type:String,
        required: [true,"can't be blank"],
    },
});


var User = mongoose.model('User', userSchema);



module.exports = User
