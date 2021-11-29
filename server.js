///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3001
// pull DATABASE_URL from .env
// const port = process.env.PORT || 3001;
const { DATABASE_URL } = process.env;
const port = process.env.PORT || 5000;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
// Accessing the path module
const path = require("path")





const cors = require("cors");
const morgan = require("morgan");
var router = express.Router();
// Accessing the path module

module.exports = function (app) {
  app.use('/', router);
};


const cardList = require('./models/cardList.js');
// const cardList = new Cardlist;



const db = mongoose.connection;

///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
useUnifiedTopology: true,
// useNewUrlgi: true,2op
});
mongoose.connection
  .on("open", () => console.log("You are connected to MongoDB"))
  .on("close", () => console.log("You are disconnected from MongoDB"))
  .on("error", (error) => console.log(error));

///////////////////////////////


///////////////////////////////
// MiddleWare
////////////////////////////////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: false }));

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("hello world");
});

//  INDEX ROUTE
app.get("/cardList", async (req, res) => {
  try {
    // send all 
    res.json(await cardList.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

// CREATE ROUTE
app.post("/cardlist", async (req, res) => {
  try {
    // send all 
    res.json(await cardList.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//  DELETE ROUTE
app.delete("/cardlist/:id", async (req, res) => {
  try {
    // send all 
    res.json(await cardList.findByIdAndDelete(req.params.id));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

//  UPDATE ROUTE
app.put("/cardlist/:id", async (req, res) => {
  try {
    // send all 
    res.json(
      await cardList.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(port, () => console.log(`listening on PORT ${port}`));
