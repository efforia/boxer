/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Merchant model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
const User = require('../../user/user.model.js');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
let MerchantSchema = new mongoose.Schema({
    merchantType: { type: String, enum: ['SERVICE_PROVIDER', 'MERCHANT'] },
    description: { type: String },
    website: { type: String },
    operation: {
        closesForLunch: { type: Boolean, default: false },
        openingTime: { type: String },
        closingTime: { type: String },
        days: { type: Array, default: [] }
    },
    delivers: { type: Boolean, default: false },
    delivery: {
        minimumValue: { type: Number, default: 0.00 },
        time: { type: Number, default: 45 },
        tax: { type: Number, default: 0.00 },
        area: { type: String }
    },
    services: [{
        description: { type: String },
        prices: {
            PUPPY: { type: Number },
            P: { type: Number },
            M: { type: Number },
            G: { type: Number },
            GG: { type: Number },
        },
    }],
    paymentData: {
        holder: { type: String },
        bankCode: { type: String },
        bankAgency: { type: String },
        bankAccount: { type: String }
    },
    paymentModes: { type: Array, default: [] },
    rating: { type: Number, default: 0 },
    role: [{ type: String, required: true, uppercase: true, default: 'MERCHANT' }]
});

// --------------- Module Plugins
MerchantSchema.plugin(lifecycle);
MerchantSchema.plugin(timestamps);
MerchantSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });

// --------------- Module Model
module.exports = User.discriminator('Merchant', MerchantSchema);
