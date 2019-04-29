/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description User controller.
 */

// --------------- Module Imports
const email = require('../email/email.controller');
const auth = require('../utils/auth.service');
const utils = require('../utils/utils');
const env = require('../../.env');
const User = require('./user.model');
const Admin = require('../admin/admin.model.js');
const Merchant = require('../marketplace/merchant/merchant.model.js');
const Customer = require('../marketplace/customer/customer.model.js');

// --------------- Module Variables
const UserModels = { 'ADMIN': Admin, 'CUSTOMER': Customer, 'MERCHANT': Merchant };

// --------------- Module Controller
const UserCtrl = module.exports = {
    create: async function (information) {
        let result = await User.findOne({ email: information.email }); // Tries to locate user
        if (result) throw new Error("Whoops! There already exists an user with this e-mail."); // In case it already exists, return error
        if (information.role == "ADMIN" || information.role == "admin") throw new Error("Not so fast fellow folk! This level of permissions must be earned, not taken."); // In case it has admin role, THEY SHALL NOT PASS!
        if (information.phone) information.formattedPhone = utils.formatPhoneNumber(information.phone, 'BR'); // Formats phone number
        let UserModel = UserModels[information.role] || User; // Gets proper modal for best polimorphism techniques
        let created = await UserModel.create(information); // Creates user on the database
        let user = created.toObject(); // Turns user object into editable object
        return Object.assign(user, { token: User.getTokenFor(user) }); // Returns the created user
    },
    sendWelcomeEmail: async function (user) {
        auth.generateEmailConfirmation(async (confirmation) => {
            confirmation = confirmation + user._id; // Generates e-mail confirmation hash
            user = await User.findOneAndUpdate({ _id: user._id }, { emailConfirmation: { hash: confirmation, createdAt: new Date() } }); // Sets confirmation hash on the user object
            let project = env.display_name; // Gets the project name
            let message = { // Sets e-mail information
                from: `${project} "<no-reply@${env.website}>"`, // From the e-mail sender account
                subject: `${project} : Confirmação de e-mail.`, // Regards e-mail confirmation
                template: 'email-confirmation', // Using the confirmation e-mail
                to: user.email, // To the created user
                context: { confirmationLink: `${env.client.SERVER_ADDRESS + env.client_root}/login/${confirmation}` } // With the e-mail confirmation link
            };
            let sent = await email.send(message); // Sends the e-mail
            return sent; // Returns confirmation
        });
    },
    get: async function (user) {
        user = await User.findOne({ _id: user._id }, '-password'); // Retrieves the user
        return Object.assign(user.toObject(), { token: User.getTokenFor(user) }); // Sends it with an updated token
    },
    isUniqueUsername: async function (username) {
        let exists = await User.findOne({ username: username }).lean(); // Checks if the username already exists on the database
        return !exists; // Returns confirmation
    },
    update: async function (user, updates) {
        let UserModel = UserModels[user.role]; // Gets proper user model (Hell, yeah, polimorphism!)
        if (!user.__t) UserModel = User; // In case there is no role, use the User-father-of-all
        delete updates.role; // Deletes role (prevents Mr. Robots to get in)
        delete updates.password; // Deletes password (for the same reason)
        delete updates.createdAt; // Removes timestamps in order to prevent conflicts
        delete updates.updatedAd; // Removes timestamps in order to prevent conflicts
        if (updates.phone) updates.formattedPhone = utils.formatPhoneNumber(updates.phone, 'BR'); // Formats the phone number
        user = await UserModel.findOneAndUpdate({ _id: user._id }, { $set: updates }, { new: true }).lean(); // Updates the user
        return Object.assign(user, { token: User.getTokenFor(user) }); // Returns the updated user
    },
    authenticate: async function (email) {
        const user = await User.findOne({ email: email }, '-password'); // Gets the user information (without password, of course)
        user.update({ $set: { active: true } }); // Sets it as active on the application database
        return Object.assign(user.toObject(), { token: User.getTokenFor(user) }); // Returns the user information
    },
    updatePassword: async function (user, newPassword) {
        return await User.findOneAndUpdate({ _id: user._id }, { $set: { password: newPassword } }); // Returns updated user
    },
    recoverPassword: async function (email) {
        let user = await User.findOne({ email: email }); // Gets user information
        if (!user) throw new Error("Whoops! Check your credentials and try again!"); // In case there is no user with this e-mail, return error
        auth.generatePassword(async (randomPassword) => { // Generates random temporary password
            user = await User.findOneAndUpdate({ _id: user._id }, { $set: { password: user.hashPassword(randomPassword) } }); // Sets it on the datase
            let project = env.display_name; // Gets project name
            let message = { // Sets e-mail information
                from: `${project} "<no-reply@${env.website}>"`, // From the e-mail sender account
                subject: `${project} : Redefinição de Senha`, // With the password recovery subject
                template: 'password-recovery-email', // With the password recovery e-mail template (.hbs)
                to: user.email, // To the user e-mail
                context: { newPassword: randomPassword } // Containing the new password
            };
            let confirmation = await email.send(message); // Sends the e-mail message
            return confirmation; // Returns the confirmation
        });
    },
    addSkip: async (userId, skip) => {
        let user = await User.findOne({ _id: userId }).lean(); // Gets user information
        let skips = user.skips || {}; // Gets steps that user already visited and can be skipped
        skips[skip] = true; // Adds provided step
        let updated = await User.findOneAndUpdate({ _id: userId }, { skips: skips }, { new: true }).lean(); // Updates user skips
        return updated; // Returns updated user
    },
    /* confirmEmail: async function (hash) {
       let user = await User.findOneAndUpdate({ 'emailConfirmation.hash': hash }).lean();
       return user;
   },
    sendConfirmationEmail: async function (user) {
           return new Promise((resolve, reject) => {
               auth.generateEmailConfirmation(async (confirmation) => {
                   confirmation = confirmation + user._id;
                   user = await User.findOneAndUpdate({ _id: user._id }, { emailConfirmation: { hash: confirmation, createdAt: new Date() } });
                   let project = env.display_name;
                   let message = {
                       from: `${project} "<no-reply@${env.website}>"`,
                       subject: `${project} : Confirmação de e-mail.`,
                       template: 'email-confirmation',
                       to: user.email,
                       context: {
                           confirmationLink: `${env.client.SERVER_ADDRESS + env.client_root}/login/${confirmation}`
                       }
                   };
                   let sent = await email.send(message);
                   resolve(sent);
               });
           })
       }, */
}
