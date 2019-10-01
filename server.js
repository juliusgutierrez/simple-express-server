const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');
const swaggerDoc = require('./swaggerDoc');
const API_PORT = 3001;
const app = express();

// var cors = require('cors');

const router = express.Router();

// connect to mongo db atlas server
const dbRoute = "mongodb://localhost:27017/test"
// connect backend code to database
mongoose.connect(dbRoute,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// check if connection with the db is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

swaggerDoc(app);

//app setup 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(jwt());

const apiUrl = "/api/v1";
//append /api/v1 to http requests
app.use(`${apiUrl}/users`, require('./user/user.controller'));
app.use(errorHandler);

// launch the backend into a port 
app.listen(API_PORT, () => console.log('Server listening on port ' + API_PORT));
