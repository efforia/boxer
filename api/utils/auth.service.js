const jwt = require('jsonwebtoken');
const User = require('../user/user.model');
const env = require('../../.env');
const master_key = require('../../.env/master_key');
const compose = require('composable-middleware');
const randomstring = require('just.randomstring');

const auth = module.exports = {
    hasValidToken: () => {
        return compose().use((req, res, next) => {
            let token = null;

            if (req.cookies.access_token) {
                token = req.cookies.token;
            }

            if (req.query.accessToken) {
                token = req.query.accessToken;
            }

            if (req.headers['x-access-token']) {
                token = req.headers['x-access-token'];
            }

            if (token) {
                User.findOneWithDeleted({ _id: jwt.verify(token, master_key)._id }, async function (error, user) {
                    if (error) {
                        res.status(500).json(error);
                    } else {
                        if (user) {
                            req.user = user.toObject();
                            next();
                        } else {
                            res.status(401).json("Whoops! It looks like this is not an valid token for this domain. Have you been switching between environments lately? :(");
                        }
                    }
                })
            } else {
                res.status(401).json({
                    'error': 'Whoops! An access token is required for this route!'
                });
            }
        });
    },

    isAuthenticated: (req, res, next) => {
        return compose().use(auth.hasValidToken());
    },

    isMerchant: () => {
        return auth.hasValidToken().
            use((req, res, next) => {
                if (req.user.roles.indexOf("MERCHANT") > -1)
                    next();
                else
                    res.status(403).json({
                        'error': `AREA 51! DO NOT TRESPASS. (a.k.a.: You don't have enought permissions for that.)`
                    });
            });
    },

    isAdmin: () => {
        return auth.hasValidToken().
            use((req, res, next) => {
                if (req.user.roles.indexOf("ADMIN") > -1)
                    next();
                else
                    res.status(403).json({
                        'error': `AREA 51! DO NOT TRESPASS. (a.k.a.: You don't have enought permissions for that.)`
                    });
            });
    },

    passwordIsValid: () => {
        return compose().use((req, res, next) => {
            let email = req.user ? req.user.email : req.body.email;
            let password = req.body.password;
            User.findOneWithDeleted({ email: email }, async (error, user) => {
                if (error)
                    return res.status(500).send(error);

                if (!user)
                    return res.status(401).send('Whoops! Check your user and try again!');

                if (!user.passwordIsValid(password))
                    return res.status(401).send('Whoops! Check your credentials and try again!');

                if (user.deleted)
                    return res.status(403).send('Whoops! It looks like this account has been suspended.');
                next();
            });
        })
    },

    paymentIsUpToDate: () => {
        return compose().use((req, res, next) => {
            console.log("Been here!");
        })
    },

    generatePassword: (callback) => {
        let randomNewPassword = randomstring(6);
        callback(randomNewPassword.toUpperCase());
    },

    generateEmailConfirmation: (callback) => {
        let randomness = randomstring(16);
        callback(randomness);
    }
}
