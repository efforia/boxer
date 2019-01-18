const express = require("express");
const path = require("path");
const colors = require("colors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const passport = require("passport");
const ip = require("ip");
const errorhandler = require("errorhandler");
const compression = require("compression");
const mars = require("./mars");
const log = require("./.bin/utils/logger").log;
const secure = require('express-force-https');

const app = express();
const env = require("./.env");
let host = ip.address();
let port = process.env.PORT || "3000";
app.use(secure);
app.use(compression());
app.use(cors());
app.use(errorhandler());
app.use(multer({ dest: path.resolve(__dirname, ".tmp") }).any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(logger("dev"));
app.set("port", port);

mars.init(app);
mars.static(app);
mars.routes(app);

const dev_mode_on = !(env.ENV_TYPE == "prod");
if (dev_mode_on) {
    mars.seeds(app);
    mars.swagger(app);
}

const server = app.listen(port, () => {
    mars.database();
    log((`♂ Mars Server: API listening on http://${host}:${port}`).green.bold);
});

mars.socket(app, server);


module.exports = app;