const express = require("express");
const hbs = require("hbs");
const path = require("path");
const weatherData = require("../utils/weatherData");

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../templests/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.render("index", { title: "Weather Finder" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send(`Address is required`);
  }

  const address = req.query.address;

  // Call the weatherData function with the provided address
  weatherData(address, (error, result) => {
    if (error) {
      return res.send(error);
    }
    res.send(result);
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


