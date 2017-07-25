let mongoose = require('mongoose');
let ManageSchema = require('../Schema/Manage');
let Manage = mongoose.model('Manage', ManageSchema);

module.exports = Manage;