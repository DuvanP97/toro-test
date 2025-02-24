const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');
var ObjectID = mongodb.ObjectID;
var database;
var PRODUCTS_COLLECTION = "products";

var app = express();
const PORT = process.env.PORT || 3000;


var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
const LOCAL_DATABASE = "mongodb://localhost:27017/test-toro";
const LOCAL_PORT = 8080;

mongodb.MongoClient.connect(process.env.MONGODB_URI || LOCAL_DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }, function (error, client) {

        if (error) {
            console.log(error);
            process.exit(1);
        }

        database = client.db();
        console.log("Database connection done.");

        var server = app.listen(process.env.PORT || LOCAL_PORT, function () {
            var port = server.address().port;
            console.log("App now running on port", port);
        });
    });


function manageError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({ "error": message });
}


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/test', testRoutes);
app.use('/api/users', userRoutes);