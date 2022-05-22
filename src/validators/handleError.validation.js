const { Joi } = require("express-validation");

module.exports = {
    // POST /v1/handleError
    handleError: {
        body: Joi.object({
            error: Joi.string().required(),
            funcName: Joi.string().required(),
            service: Joi.string().required(),
            environment: Joi.string().required(),
        }),
    },
};
