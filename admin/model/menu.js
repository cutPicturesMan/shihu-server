let mongoose = require('mongoose');
let MenuSchema = require('../schema/menu');
let Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;