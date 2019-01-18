const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../user/user.model");
const env = require("../../.env");

passport.use(new FacebookTokenStrategy({
    clientID: env.client.FACEBOOK_CLIENT_ID,
    clientSecret: env.server.FACEBOOK_CLIENT_SECRET
}, function(accessToken, refreshToken, profile, done) {
    let user = profile._json;
    return done(null, user);
}));