const PhoneNumber = require('awesome-phonenumber');

const utils = module.exports = {

    generateUniqueIdOf: async function(numberOfChars) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < numberOfChars; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text.toUpperCase();
    },

    formatPhoneNumber(number, region) {
        let phone = new PhoneNumber(number, region); // Instances the number for formatting purposes
        phone = phone.getNumber('significant'); // Gets the digits only
        if (!phone || !phone.length || !phone.substr)
            return {};
        else
            return {
                countryCode: '55',
                areaCode: phone.substr(0, 2),
                number: phone.substr(2, phone.length - 1),
            };
    },

    distanceBetweenPoints: async function(f1, f2, a1, a2) {
        var conversion = Math.PI / 180.0;

        var latitude1 = f1;
        var latitude2 = f2;

        var longitude1 = a1;
        var longitude2 = a2;

        var dDistance = -1.79769e+308; // Double.MinValue;
        var dLat1InRad = latitude1 * conversion;
        var dLong1InRad = longitude1 * conversion;
        var dLat2InRad = latitude2 * conversion;
        var dLong2InRad = longitude2 * conversion;

        var dLongitude = dLong2InRad - dLong1InRad;
        var dLatitude = dLat2InRad - dLat1InRad;

        // Intermediate result a.
        var a = Math.pow(Math.sin(dLatitude / 2.0), 2.0) +
            Math.cos(dLat1InRad) * Math.cos(dLat2InRad) *
            Math.pow(Math.sin(dLongitude / 2.0), 2.0);

        // Intermediate result c (great circle distance in Radians).
        var b = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));

        // 6378100 = earth radius in meters
        dDistance = 6378100 * b;

        return Math.abs(dDistance);
    }
};