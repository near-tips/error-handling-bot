const express = require('express');
const { validate } = require('express-validation');
const { handleError } = require("../../validators/handleError.validation");
const { bot } = require("../../utils/telegramBot");
const { chatId } = require('../../config/vars');

const router = express.Router();

router.post('/handleError', validate(handleError, {}, {}), async (req, res) => {
    try {
        const { error, funcName, service, environment } = req.body;

        await bot.sendMessage(chatId, `Service: ${ service } \nError: ${ error } \nFunction: ${ funcName }\n#${environment}`);

        res.send('ok')
    } catch (error) {
        if (error.response) {
            console.log('Notify error \n', error.response.data);
            res.status(error.response.status).json({
                success: false,
                message: error.response.data,
            });
        } else {
            console.log('Notify error \n', error);
            res.status(400).json({
                success: false,
                message: error,
            });
        }
    }
});

module.exports = router;
