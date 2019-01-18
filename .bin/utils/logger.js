/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const chalk = require("chalk");

module.exports = buildLogger = {
    log: (message) => {
        let prefix = buildLogger.timePrefix();
        message = (prefix) + "  " + message;
        console.log(message);
    },
    timePrefix: () => {
        var date = new Date();
        return '[' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + ']';
    }
};