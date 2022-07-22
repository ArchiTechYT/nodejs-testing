const path = require("path");
const express = require("express");
const request = require("request");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forecast");

// Define Paths
const publicDir = path.join(__dirname, "../public"); // find public, use index.html automatically
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebar engine and view's location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Homepage",
    name: "Yi-Ju Tseng",
  });
});

// Sub-Pages
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yi-Ju Tseng",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help msg from app js file!",
    title: "Help",
    name: "Yi-Ju Tseng",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an geo coordiante...",
    });
  }

  forecast(37.83, -122.42, (error, forecastData) => {
    if (error) {
      return res.send({ error }); // use return then you dont need else
    }
    res.send({
      forecastData: forecastData,
      location: req.query.address,
    });
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term...",
    });
  }

  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Yi-Ju Tseng",
    errorMessage: "Help articles not found...",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Yi-Ju Tseng",
    errorMessage: "Page not found...",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

// (-33.92, 151.03) = Sydney
// Calling forecast-app here

// const lat = process.argv[2];
// const long = process.argv[3];
// let wOutput = "";
// forecast(lat, long, (error, forecastData) => {
//   wOutput = forecastData;
// });

// app.get("/weather", (req, res) => {
//   res.send(wOutput);
// });

///////////////////////////////////////////
// NodeJS example which works...
// const hostname = "127.0.0.1";
// const port = 3000;
// const http = require("http");
// const userInputs = process.argv[2];

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end(userInputs);
//   // why res.send doesn't work??
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
