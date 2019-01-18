/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Picture model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
const PictureSchema = mongoose.Schema({
    file: { type: String, lowercase: true, required: true },
    mimeType: { type: String, lowercase: true, default: "image/jpeg" },
    externalRef: { type: String },
    sent: { type: String }
});

// --------------- Module Plugins
PictureSchema.plugin(lifecycle);
PictureSchema.plugin(timestamps);
PictureSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('Picture', PictureSchema);