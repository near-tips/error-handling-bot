const { Joi } = require("express-validation");

module.exports = {
    // POST /v1/handleError
    handleError: {
        body: Joi.object({
            error: Joi.string(),
            funcName: Joi.string(),
            service: Joi.string(),
        }),
    },
};
