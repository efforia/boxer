/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Order receiving mode model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
let ReceivingModeSchema = mongoose.Schema({
    value: { type: String, required: true },
});

// --------------- Module Plugins
ReceivingModeSchema.plugin(lifecycle);
ReceivingModeSchema.plugin(timestamps);
ReceivingModeSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('ReceivingMode', ReceivingModeSchema);