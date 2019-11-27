const app = require("express")();
const fs = require("fs");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const Radio = require("./models/Radio");

const urlUser = "mongodb://root:123@172.16.0.2:27017/";
const urlRadio = "mongodb://root:123@172.16.0.3:27017/";
const urlLog = "mongodb://172.16.0.4:27017/";

// function initDb(addr = "", options = {}, callback) {
//   MongoClient.connect(addr, options, callback);
// }

app.listen(3000 || process.env.PORT, () => console.log("Server is running..."));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API!"
  });
});

app.route("/api/radios").get(Radio.get_radios);

app.get("/api/radios/:id", Radio.get_radio);

app.get("/api/radios/:id/:state", Radio.update_radio);

app.get("/api/users", (req, res) => {
  // get all users
});

app.get("/api/users/:id", (req, res) => {
  // get one user
});

app.get("/api/logs", (req, res) => {
  // get logs
});

app.get("/api/logs/:id", (req, res) => {
  // get one log
});

app.get("/radio", (req, res) => {
  res.send("radio");
});
