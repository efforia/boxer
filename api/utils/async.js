module.exports = function(method) {
    if (typeof method !== "function")
        throw new Error(`${method} is not a function!`);
    return async (req, res, next) => {
        return new Promise((reject, resolve) => {
            method(req, res, next).catch((error) => {
                console.log(error.response ? error.response.data : error);
                res.status(500).send(error.response ? error.response.data : error);
            });
        });
    };
};