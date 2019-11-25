const app = require("express")();
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
    res.send("bonjour")
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));