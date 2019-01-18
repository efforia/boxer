/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Order model.
 */

// --------------- Module Imports
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const mongoose_delete = require('mongoose-delete');
const lifecycle = require('mongoose-lifecycle');
const realtime = require('./order.realtime');
require('mongoose-schema-jsonschema')(mongoose);

// --------------- Module Schema
let OrderSchema = mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    availableMerchants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
    items: [{
        price: { type: Number },
        discountPrice: { type: Number },
        quantity: { type: Number },
        total: { type: Number },
    }],
    status: { type: String, default: "created" },
    deliveryTax: { type: Number },
    subtotal: { type: Number },
    total: { type: Number },
    acceptedAt: { type: Date },
    rejectedAt: { type: Date },
    paymentMode: { type: String, default: 'ON_DELIVERY' },
    paymentInstrument: { type: Object, default: { label: 'CASH' } },
    receivingMode: { type: String, default: 'CHECKOUT' },
    ratings: {
        customerRate: { type: Number, default: 0 },
        merchantRate: { type: Number, default: 0 }
    },
    paymentInfo: { type: Object },
    payload: { type: Object },
    job: {
        scheduledTo: { type: Date, default: Date.now() },
        origin: {
            items: [{
                description: { type: String }
            }],
            address: {
                vicinity: { type: String, default: "" },
                street: { type: String, default: "" },
                number: { type: String },
                neighbourhood: { type: String },
                city: { type: String },
                state: { type: String },
                country: { type: String },
                complement: { type: String },
                location: { lng: Number, lat: Number },
                postalCode: { type: String },
            },
        },
        stops: [{
            address: {
                vicinity: { type: String, default: "" },
                street: { type: String, default: "" },
                number: { type: String },
                neighbourhood: { type: String },
                city: { type: String },
                state: { type: String },
                country: { type: String },
                complement: { type: String },
                location: { lng: Number, lat: Number },
                postalCode: { type: String },
            },
            items: [{
                description: { type: String }
            }]
        }],
        destination: {
            address: {
                vicinity: { type: String, default: "" },
                street: { type: String, default: "" },
                number: { type: String },
                neighbourhood: { type: String },
                city: { type: String },
                state: { type: String },
                country: { type: String },
                complement: { type: String },
                location: { lng: Number, lat: Number },
                postalCode: { type: String },
            },
        }
    }
});

// --------------- Module Plugins and indexes
OrderSchema.index({ 'job.origin.address.location': '2dsphere' });
OrderSchema.plugin(lifecycle);
OrderSchema.plugin(timestamps);
OrderSchema.plugin(mongoose_delete, { overrideMethods: 'all', validateBeforeDelete: false });
realtime(OrderSchema);

// --------------- Module Model
module.exports = mongoose.model('Order', OrderSchema);