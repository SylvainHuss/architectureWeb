const app = require("express")();
const bodyParser = require("body-parser");
const Radio = require("./models/Radio");

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
