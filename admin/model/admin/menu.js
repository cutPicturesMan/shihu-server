let mongoose = require('mongoose');
let MenuSchema = require('../../schema/admin/menu');
let Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;