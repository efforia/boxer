// define models =========================================================
var User = require('../user/user.model.js');
const OauthCtrl = module.exports = {

    accessWithFacebook: async function (profile) {
        let oauthUser = await User.findOne({ 'oauth.facebook.id': profile.id }).lean(); // In case the user exists
        if (oauthUser) return (Object.assign(oauthUser, { token: User.getTokenFor(oauthUser) })); // Creates a session and returns it

        let user = await User.findOne({ 'email': profile.email }).lean(); // Otherwise, in case the e-mail exists on the database
        if (user) return (Object.assign(user, { token: User.getTokenFor(user) })); // Links the social account to the user and return it

        // Otherwise...
        user = (await User.create({ provider: "facebook", oauth: { facebook: profile }, email: profile.email, name: profile.name })).toObject(); // Creates the user
        return { created: Object.assign(user, { token: User.getTokenFor(user) }) }; // And return it with a token
    }
};