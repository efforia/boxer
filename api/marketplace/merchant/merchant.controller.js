/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Merchant controller.
 */

// --------------- Module Imports
const axios = require("axios");
const mongoose = require("mongoose");
const PhoneNumber = require("awesome-phonenumber");
const countries = require("i18n-iso-countries");
const env = require("../../../.env/index");
const Merchant = require('./merchant.model');
const Order = require('../order/order.model');

// --------------- Module Variables
const MOIP_HEADERS = { "Content-Type": "application/json", "Authorization": `OAuth ${env.MOIP_APP_TOKEN}` };
const DEFAULT_BIRTHDATE = "1991-10-10";
const DEFAULT_RADIUS = 100000;

// --------------- Module Controller
const MerchantCtrl = module.exports = {
    details: async function (id, username) {
        let byCriteria = username ? { username: username } : { _id: id }; // Creates criteria
        let merchant = await Merchant.findOne(byCriteria, '-password -paymentData').lean(); // Gets merchant details
        return merchant; // Returns it
    },

    updateRating: async function (id) {
        let orders = await (Order.find({ merchant: id, 'customerRate': { $ne: null } }, '-_id customerRate')); // Gets merchant orders
        let ratingsTotal = 0; // Initializes rating count
        orders.map((order) => { ratingsTotal += order.customerRate; }); // Calculates the rating amount
        let rating = (ratingsTotal / orders.length); // Divides it by the ratings number
        let merchant = await Merchant.findOneAndUpdate({ _id: id }, { rating: rating }); // Updates it on the the merchant
        return merchant; // Returns the updated merchant
    },

    nearby: async function (params) {
        let merchants = []; // Initializes the merchants array
        let point = { coordinates: [params.longitude, params.latitude], type: 'Point' }; // Formats the coordinates object
        let query = { query: params.criteria, distanceMultiplier: 0.001, spherical: true, lean: true }; // Sets the query parameters
        if (params.radius) query.maxDistance = params.radius; // Sets the radius for the query
        let results = await Order.geoNear(point, query) || []; // Searches for the nearby merchants
        results.map((result) => merchants.push(Object.assign(result.obj, { distance: result.dis ? result.dis.toFixed(1) : undefined }))); // Adds the distance to the results
        return merchants; // Returns nearby merchants list
    },

    nearbyMerchants: async function (latitude, longitude, radius, keyword) {
        keyword = new RegExp(keyword); // Creates keyword regex
        let params = { // Inializes database query parameters
            latitude: (parseFloat(latitude) || 0), // Query latitude
            longitude: (parseFloat(longitude) || 0), // Query longitude
            // radius: (parseInt(query.radius) || DEFAULT_RADIUS), // Query max distance
            criteria: { __t: "Merchant", name: { $regex: keyword, $options: 'i' } } // Query keyword
        };
        let merchants = await MerchantCtrl.nearby(params); // Searches for nearby merchants with the given criteria
        return merchants; // Returns filtered list
    },

    nearbyByService: async function (service, latitude, longitude, radius, keyword) {
        let parameters = { // Sets the query parameters
            radius: (DEFAULT_RADIUS || parseInt(radius)), // Query max distance
            latitude: (0 || parseFloat(latitude)), // Query latitude
            longitude: (0 || parseFloat(longitude)), // Query longitude
            keyword: ("" || keyword) // Query keyword
        };
        parameters.criteria = { services: { $elemMatch: { description: service } } }; // Query service type
        return await MerchantCtrl.nearby(parameters, "_id") || []; // Returns nearby merchants
    }
}
