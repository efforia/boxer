/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Notification model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
const NotificationSchema = mongoose.Schema({
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    title: { type: String },
    contents: { type: String },
    pictureUrl: { type: String },
    data: { type: Object },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, default: 'created' }
});

// --------------- Module Plugins
NotificationSchema.plugin(lifecycle);
NotificationSchema.plugin(timestamps);
NotificationSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('Notification', NotificationSchema);