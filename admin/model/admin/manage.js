let mongoose = require('mongoose');
let ManageSchema = require('../../schema/admin/manage');
let Manage = mongoose.model('Manage', ManageSchema);

module.exports = Manage;