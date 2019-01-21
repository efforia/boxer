/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 * @description Mars configuration main.
 */

require("./utils.js");
const express = require("express");
const subdomain = require('express-subdomain');
const secure = require('express-force-https');
const packageInfo = require("./package.json");
const path = require("path");
const fs = require("fs-extra");

const wildcard = require('socketio-wildcard');
const ip = require("ip");
const mongoose = require("mongoose");

const swaggerSpecs = require("swagger-spec-express");
const swaggerUi = require("swagger-ui-express");
const faviconPath = path.join(__dirname, "public", "app", "assets", "icon", "favicon.png");

const colors = require("colors");
const klawSync = require("klaw-sync");
const titlecase = require("titlecase");
const staticZip = require("express-static-gzip");

const env = require("./.env");
const log = require("./.bin/utils/logger").log;
const apiDir = path.join(__dirname, "api");

const setSubdomainStaticFolder = (app, alias, folder) => {
    app.use(subdomain(alias, express.static(path.join(__dirname, "public", folder))));
    app.use(subdomain(alias, staticZip(path.join(__dirname, "public", folder, "build"), { enableBrotli: true, orderPreference: ["br", "gz"] })));
    app.use(subdomain(alias, secure));
};

const Mars = module.exports = {
    init: function (app) {
        log(`Mars Server: starting...`.yellow.bold);
        mongoose.Promise = require("bluebird");
        app.use(function (err, req, res, next) {
            res.status(500).send("This is Mars to Major Tom: Something's wrong!");
        });
    },

    database: async function () {
        try {
            log(`Connecting to MongoDB: ${env.server.MONGODB}...`.yellow);
            mongoose.Promise = global.Promise;
            mongoose.set('useCreateIndex', true);
            await mongoose.connect(env.server.MONGODB, { useMongoClient: true });
        } catch (error) {
            if (error) console.log(error);
            log(`MongoDB connection failure: ${error}!`.red);
        }
    },

    socket: function (app, server) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            next();
        });
        const io = require('socket.io').listen(server);
        io.use(wildcard());
        io.on('connection', function (socket) {
            socket.emit("connection");
            console.log((`Mars Server: An user connected.`).green);
            socket.on('*', (event) => {
                let name = event.data ? event.data[0] : "";
                let data = event.data ? (event.data[1] || {}) : {};
                let room = data.room;
                delete data.room;
                return room ? socket.to(room).emit(name, data) : socket.broadcast.emit(name, data);
            });
            socket.on('join', function (room) {
                socket.join(room);
            });
            socket.on('leave', function (room) {
                socket.leave(room);
            });
        });
    },

    routes: function (app) {
        let isWin = process.platform === "win32";
        let apis = klawSync(apiDir);
        let apiPath = "";
        let displayName = "";
        let router = express.Router();
        apis = apis.map((api) => { if (api) return api.path; });
        apis = apis.filter((api) => { return api && (api.indexOf("index.js") > -1) });
        apis.forEach((api) => {
            apiPath = isWin ? api.split("\\") : api.split("/");
            apiPath = apiPath[apiPath.length - 2];
            displayName = titlecase(apiPath.replace("-", " "));
            log(`Initializing ${displayName} routes...`.yellow);
            router.use(`/${apiPath}`, require(`${api}`));
        });
        let isLocalhost = ip.address().indexOf("192") > -1;
        if (!isLocalhost) {
            // app.use(subdomain(env.client.IS_DEVELOPMENT ? "dev.api" : "api", router)); // Add to API routes
            app.use(router);
        } else {
            app.use(router); // Add to app routes
        }
        app.use('/', express.static('landing/public'));
    },

    static: async function (app) {
        if (env.server.ENV_TYPE !== "local") {
            // setSubdomainStaticFolder(app, (env.client.IS_DEVELOPMENT ? "dev.www" : "www"), "landing");
            // setSubdomainStaticFolder(app, (env.client.IS_DEVELOPMENT ? "dev.dashboard" : "dashboard"), "admin");
            // setSubdomainStaticFolder(app, (env.client.IS_DEVELOPMENT ? "dev.app" : "app"), "customer");
            // setSubdomainStaticFolder(app, (env.client.IS_DEVELOPMENT ? "dev.driver" : "driver"), "driver");
        }
    },

    swagger: async function swagger(app) {
        swaggerSpecs.initialise(app, { title: packageInfo.title, version: packageInfo.version });
        swaggerSpecs.compile();
        fs.writeFileSync(path.join(__dirname, "swagger.json"), JSON.stringify(swaggerSpecs.json()));
        app.use("/swagger.io", (req, res) => { return res.status(200).send(swaggerSpecs.json()) });
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(null, null, null, `.swagger-ui .topbar { background-color: ${env.primary_color} } .swagger-ui .wrapper { max-width: 800px; margin: auto; } `, faviconPath, `/swagger.io`, "API Docs"));
    },

    seeds: async function (app) {
        app.use("/plant", (req, res) => { // import data for test
            const seedsDir = path.join(__dirname, "seeds");
            let isFile;
            fs.readdirSync(seedsDir).forEach(function (seed) {
                isFile = seed && (seed.indexOf(".") > -1);
                if (isFile) require(path.join(seedsDir, seed))
            });
            return res.status(200).json("The seeds have been planted.");
        });
    },

    firebasePolyfill: async function (app) {
        app.locals.hasOwnProperty = function () { return false; };
        app._events.hasOwnProperty = function () { return false; };
    }
}
