/**
 * @license MIT
 * @version 1.1.0
 * @author M.A.R.S. Labs
 */

const swagger = require("swagger-spec-express");
const express = require("express");

module.exports = class MarsRouter extends express.Router {
    constructor(entity) {
        super();
        swagger.swaggerize(this);
        this.entity = entity;
    }

   docs() {
        this.stack.map((endpoint) => {
            console.log(endpoint.route);
        });
    };
}