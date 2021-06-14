const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { lstat } = require("fs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname, "../public")); // ../ gets one directory up and moves to public
//setup handlebars for express config
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

//setup static directory
app.use(express.static(path.join(__dirname, "../public"))); // set public

app.get("", (req, res) => {
  res.render("index", {
    title: "root",
    name: "Markus",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Markus",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Markus",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geoCode(req.query.address, (err, { lat, long, placename } = {}) => {
      if (err) {
        return res.send({ error: err });
      }
      forecast(lat, long, (err, { temp, humidity } = {}) => {
        if (err) {
          return res.send({ error: err });
        }

        res.send({
          location: placename,
          Temperatur: temp,
          Humdity: humidity,
        });
      });
    });
  } else {
    return res.send({ error: "Please provide a location" });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

// after help the route doesn't exist it shows the message
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help 404",
    name: "Markus",
    errmsg: "Help article not found",
  });
});

// for all routes which are not defined -> 404 - it has to be at the end of all routes
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Markus",
    errmsg: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
