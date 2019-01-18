/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Chat message model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');

// --------------- Module Schema
const MessageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  contents: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

// --------------- Module Plugins
MessageSchema.plugin(lifecycle);
MessageSchema.plugin(timestamps);
MessageSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('Message', MessageSchema);
