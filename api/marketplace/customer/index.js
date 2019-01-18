/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Customer routes.
 */

// --------------- Module Imports
const auth = require("../../utils/auth.service");
const MarsRouter = require("../../base/router");
const swaggerUtils = require("../../utils/swagger.utils");
const execute = require("../../utils/async");
const router = new MarsRouter("customer");
const controller = require("./customer.controller");

/**
 * @interface addFavorite
 * Adds favorite merchant to the user.
 */
router.post("/favorites/merchant/:merchant", auth.isAuthenticated(), execute(async (req, res) => {
    let merchant = req.params.merchant;
    let user = req.user;
    let favorites = await controller.addFavorite(user, merchant);
    return res.status(200).json(favorites);
})).describe({
    tags: [router.entity],
    operationId: "addFavoriteMerchant",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

/**
 * @interface removeFavorite
 * Removes favorite merchant from the user.
 */
router.post("/favorites/merchant/:merchant", auth.isAuthenticated(), execute(async (req, res) => {
    let merchant = req.params.merchant;
    let user = req.user;
    let favorites = await controller.removeFavorite(user, merchant);
    return res.status(200).json(favorites);
})).describe({
    tags: [router.entity],
    operationId: "removeFavoriteMerchant",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

/**
 * @interface listFavorites
 * List favorite merchants from the user.
 */
router.get("/favorites/merchants", auth.isAuthenticated(), execute(async (req, res) => {
    let user = req.user;
    let favorites = await controller.getFavorites(user);
    return res.status(200).json(favorites);
})).describe({
    tags: [router.entity],
    operationId: "getFavoritesList",
    responses: swaggerUtils.defaultResponses(),
    parameters: [swaggerUtils.authParam()]
});

module.exports = router;