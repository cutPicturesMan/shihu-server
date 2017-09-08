let mongoose = require('mongoose');
let ManageSchema = require('../schema/manage');
let Manage = mongoose.model('Manage', ManageSchema);

module.exports = Manage;