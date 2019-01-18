/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Admin model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
const User = require('../user/user.model.js');

// --------------- Module Schema
let AdminSchema = new mongoose.Schema({});

// --------------- Module Plugins
AdminSchema.plugin(lifecycle);
AdminSchema.plugin(timestamps);
AdminSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
let Admin = User.discriminator('Admin', AdminSchema);

module.exports = Admin;