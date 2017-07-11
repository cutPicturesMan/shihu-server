let mongoose = require('mongoose');
let UserSchema = require('../Schema/User');
let User = mongoose.model('User', UserSchema);

module.exports = User;