const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Retrieve all location data
app.get("/locations", (req, res) => {
  res.send("hello");
});

// Retrieve the path from one location to another
app.get("/route/:from-:to", (req, res) => {
  res.send("Not yet implemented");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
