/* Swagger utils based on the Open API 2 specs 
(https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md)*/
const swagger = require('swagger-spec-express');
const m2s = require('mongoose-to-swagger');

let service = module.exports = {
    getPropertiesFromModel: (mongooseSchema, options) => {
        options = options || {};
        let swaggerSchema = m2s(mongooseSchema);
        let schemaProperties = swaggerSchema.properties;
        if (!schemaProperties)
            return {};

        let example = {};
        for (property in schemaProperties) {
            let value = schemaProperties[property];
            if (value.type) {
                example[property] = { type: value.type };
                if (example[property].type == "mixed") {
                    example[property].type = "object";
                }
                if (!options.keepDatabaseVars) {
                    delete example["_id"];
                }
                delete example["createdAt"];
                delete example["updatedAt"];
                delete example["__v"];
                delete example["__t"];
            }
        };
        return example;
    },
    defaultResponses: () => {
        return {
            200: { description: "Operation finished successfully." },
            400: { description: "Invalid parameter(s). (More details on response object)" },
            500: { description: "Server error. (More details on response object)" }
        };
    },
    bodyParam: (name, description, schema, options) => {
        return Object.assign((options || {}), {
            "name": name,
            "in": "body",
            "description": description,
            "schema": schema
        });
    },
    authParam: () => {
        return {
            "name": "x-access-token",
            "in": "header",
            "description": "JWT created on user creation or authentication.",
            "type": "string",
            "required": true
        };
    },
    generateDefinitionFile: () => {

    }
}