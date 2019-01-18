/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description E-mail controller.
 */

// --------------- Module Imports
const nodemailerSendgrid = require("nodemailer-sendgrid");
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require("nodemailer");
const locales = require('../../.mars/locales/pt');
const project = require('../../.mars/project');
const colors = require('../../.mars/colors');
const env = require('../../.env');

// --------------- Module Controller
const EmailCtrl = module.exports = {
    send: async function (options) {
        let year = (new Date()).getFullYear(); // Full year 
        let defaults = { // Default context variables
            header_background: `${env.client.SERVER_ADDRESS}/texture.jpg`, // E-mail background
            icon: `${env.client.SERVER_ADDRESS}/icon.png`, // Application icon
            locales: locales, // Application locales for internationalization
            env: env, // Environment variables
            year: year, // Full year label,
            colors: colors
        };
        options.context = options.context ? Object.assign(defaults, options.context) : defaults; // Context variables

        // let transport = nodemailer.createTransport({ service: "Gmail", auth: { user: env.EMAIL_ADDRESS, pass: env.EMAIL_PASSWORD } });  //  Use this for Gmail ;)
        const transport = nodemailer.createTransport(nodemailerSendgrid({ apiKey: env.server.SENDGRID_API_KEY })); //  Use this for SendGrid ;)

        // compile templates .hbs files => templates from: https://www.sendwithus.com/resources/templates/oxygen
        transport.use("compile", hbs({ // E-mail sender configuration
            viewEngine: {
                extname: ".hbs", // E-mail rendering engine
                layoutsDir: __dirname + "/templates/", // 
                partialsDir: __dirname + "/templates/partials/" //
            },
            viewPath: __dirname + "/templates/", //
            extName: ".hbs" //
        }));
        return await transport.sendMail(options);
    },
};