/*EXTENTIONS*/
require("dotenv").config();
const express = require('express');                   //To use Express
const bodyParser = require('body-parser');            //To get the request Bodyy
const multer = require('multer');                     //To store a Image
const MongoClient = require('mongodb').MongoClient;   //To connect with mongodb
const cors = require('cors');                         //To make cross-origin requests
const rateLimit = require('express-rate-limit');      //To prevent DDOS
const checkLocation = require('./helpers/checkLocation');
const storeImage = require('./helpers/storeImage');
const uuid = require('uuid');
const fs = require("fs");

const app = express();
const port = process.env.BACKEND_PORT || 5000;
const upload = multer({ storage: storeImage() });


/*Middlewares*/
app.use(rateLimit({
  windowMs: 1000, //1 second
  max: 20,        //Limit for each IP pre windowMs
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));


/**
 * Get the Geolocations
 */
app.get('/api/geoLocations', (req, res) => {
  MongoClient.connect(process.env.DBURL, function (err, db) {
    if (err) throw err;
    let dbo = db.db("geolocations");
    dbo.collection("locations").find({}).toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      db.close();
    });
  });
});

/**
 * Post the Geolocations
 */
app.post('/api/geoLocations', [upload.any(), checkLocation], (req, res) => {

  let newLocation = { ...req.body, id: uuid.v4(), image: '/images/' + req.fileName }
  MongoClient.connect(process.env.DBURL, function (err, db) {
    if (err) throw err;
    let dbo = db.db("geolocations");
    dbo.collection("locations").insertOne(newLocation, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
  res.send({ status: 200, success: true });
});


/**
 * Delete a Geolocation
 */
app.delete('/api/geoLocations/:id', (req, res) => {


  /*Unlink image*/
  MongoClient.connect(process.env.DBURL, function (err, db) {
    if (err) throw err;
    let dbo = db.db("geolocations");
    dbo.collection("locations").find({ id: req.params.id }).toArray(function (err, result) {

      fs.unlink(__dirname + "/public" + result[0].image, (err) => {
        if (err) throw err;
      });
      db.close();
    });
  });

  /*Delete Location*/
  MongoClient.connect(process.env.DBURL, function (err, db) {
    if (err) throw err;
    let dbo = db.db("geolocations");
    dbo.collection("locations").deleteOne({ id: req.params.id }, function (err, res) {
      if (err) throw err;
      db.close();
    });
  });
  res.send({ status: 200, success: true });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
