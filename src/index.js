const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const routes = require('./routes/v1');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const {ValidationError} = require("express-validation");
const { port, origin } = require("./config/vars");

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors({
    origin, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use('/v1', routes);

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        console.log('err', err);
        return res.status(err.statusCode).json(err)
    }

    if (err) {
        console.log('err', err);
        return res.status(500).json(err)
    }

    return next();
})

app.get('/', (req, res) => {
    res.send('Ok!')
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})