require("dotenv").config();

const { getLocationData, getRoute } = require("./queries");
const express = require("express");
const app = express();
const port = 3000;

const neo4j = require("neo4j-driver");

// Init Neo4j connection
const uri = process.env.URI;
const user = 'neo4j';
const password = process.env.PASSWORD;

// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

app.get("/", async (req, res) => {
  res.send("Hello world!");
});

// Retrieve all location data
app.get("/locations", async (req, res) => {
  const response = await getLocationData(driver);
  console.log(response)
  res.send(response);
});

// Retrieve the path from one location to another
app.get("/route/:from-:to", async (req, res) => {
  const response = await getRoute(driver, req.params.from, req.params.to)
  console.log(response)
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
