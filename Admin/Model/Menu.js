let mongoose = require('mongoose');
let MenuSchema = require('../Schema/Menu');
let Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;