/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Lead model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
const LeadSchema = mongoose.Schema({
    email: { type: String, lowercase: true, required: true },
});

// --------------- Module Plugins
LeadSchema.plugin(lifecycle);
LeadSchema.plugin(timestamps);
LeadSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('Lead', LeadSchema);