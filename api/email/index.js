/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Email routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const MarsRouter = require("../base/router");
const router = new MarsRouter("email");
const controller = require("./email.controller");
const hbs = require("hbs");
const palette = require("../../.mars/colors");
const locales = require("../../.mars/locales/pt");
const env = require("../../.env");

let year = (new Date()).getFullYear(); // Full year 
let context = { // Default context variables
    header_background: `${env.client.SERVER_ADDRESS}/texture.jpg`, // E-mail background
    icon: `${env.client.SERVER_ADDRESS}/icon.png`, // Application icon
    locales: locales, // Application locales for internationalization
    env: env, // Environment variables
    year: year, // Full year label,
    colors: palette
};

/**
 * @interface listUsers
 * Lists users including the deleted ones.
 */
router.get("/:template", execute(async (req, res) => {
    const template = req.params.template;
    console.log(template);
    return res.status(200).json({ message: "Cool, cool, cool." });
}));

module.exports = router;