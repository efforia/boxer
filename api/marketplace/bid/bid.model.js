/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Bid message model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');

// --------------- Module Schema
const BidSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }],
  description: { type: String, default: "" },
  value: { type: mongoose.Schema.Types.Number, required: true }
})

// --------------- Module Plugins
BidSchema.plugin(lifecycle);
BidSchema.plugin(timestamps);
BidSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = mongoose.model('Bid', BidSchema);
