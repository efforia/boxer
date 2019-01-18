/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Subscription routes.
 */

// --------------- Module Imports
const auth = require("../utils/auth.service");
const MarsRouter = require("../base/router");
const swaggerUtils = require("../utils/swagger.utils");
const execute = require("../utils/async");
const router = new MarsRouter("oauth");
const controller = require("./oauth.controller");

const passport = require("passport");
const passportFB = require("passport-facebook-token");
const facebookConfig = require("./facebook.config");

/**
 * @interface accessWithFacebook
 * Sign up or sign in user on the platform based on its facebook token.
 */
router.post("/access/facebook", passport.authenticate("facebook-token", { session: false }), execute(async (req, res) => {
    let profile = req.user; // Gets the social profile
    let user = await controller.accessWithFacebook(profile);
    return res.status(200).json(user);
})).describe({
    tags: [router.entity],
    operationId: "accessWithFacebook",
    parameters: [
        { "name": "access_token", "in": "query", "description": "User access token returned from Facebook oauth.", "type": "number", "required": true },
    ],
    responses: Object.assign(swaggerUtils.defaultResponses())
});

module.exports = router;