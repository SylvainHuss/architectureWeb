const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const Radio = require("./models/Radio");
const User = require("./models/User");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API!"
  });
});

app.route("/api/radios").get(Radio.get_radios);

app.get("/api/radios/clear", Radio.clear_radios);

app.route("/api/radios/:id").get((req, res) => {
  const queries = req.query;
  if (Object.keys(queries).length) {
    Radio.update_radio(req, res);
  } else {
    Radio.get_radio(req, res);
  }
});

app.get("/api/users", User.get_users);

app.get("/api/users/:id", User.get_user);

app.get("/api/logs", (req, res) => {
  // get logs
});

app.get("/api/logs/:id", (req, res) => {
  // get one log
});

app.get("*", (req, res) => {
  res.json({
    message: "Nothing to see here :("
  })
});

app.listen(3000 || process.env.PORT, () => console.log("Server is running..."));
