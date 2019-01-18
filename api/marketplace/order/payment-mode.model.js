/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Payment mode model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
let PaymentModeSchema = mongoose.Schema({
    value: { type: String, required: true }
});

// --------------- Module Plugins
PaymentModeSchema.plugin(lifecycle);
PaymentModeSchema.plugin(timestamps);
PaymentModeSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('PaymentMode', PaymentModeSchema);