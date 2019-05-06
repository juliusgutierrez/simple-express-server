const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const logger = require('morgan');
const jwt = require('./_helpers/jwt');
const errorHandler = require('./_helpers/error-handler');

const API_PORT = 3001;
const app = express();

// var cors = require('cors');

const router = express.Router();

// connect to mongo db atlas server
const dbRoute = "";

// connect backend code to database
mongoose.connect(
    dbRoute,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// check if connection with the db is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//app setup 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(jwt());

// Hello World 
app.use("/test", (req, res) => res.send('Hello World!'));

//append /api to http requests
app.use("/api", router);

app.use("/users", require('./user/user.controller'));

app.use(errorHandler);

// launch the backend into a port 
app.listen(API_PORT, () => console.log('Server listening on port ' + API_PORT));
