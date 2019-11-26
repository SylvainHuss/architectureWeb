const app = require("express")();
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient;

var urlUser = "mongodb://72.16.0.2:27017/userDB";
var urlRadio = "mongodb://72.16.0.3:27017/radioDB";
var urlLog = "mongodb://72.16.0.4:27017/logDB";

// MongoClient.connect(urlUser, function(err, dbUser) {
//     if (err) throw err;
//     console.log("User database created!");
//     var dbo = dbUser.db("userDB");
//     dbo.createCollection("user", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       dbUser.close();
//     });
//   });

//   MongoClient.connect(urlRadio, function(err, dbRadio) {
//     if (err) throw err;
//     console.log("Radio database created!");
//     var dbo = dbRadio.db("radioDB");
//     dbo.createCollection("radio", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       dbRadio.close();
//     });
//   });

//   MongoClient.connect(urlLog, function(err, dbLog) {
//     if (err) throw err;
//     console.log("Log database created!");
//     var dbo = dbLog.db("logDB");
//     dbo.createCollection("log", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       dbLog.close();
//     });
//   });

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (req, res) => {
    console.log("begin")
    MongoClient.connect(urlRadio, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    const db = client.db('radioDB')
    const collection = db.collection('radio')
    collection.find().toArray((err, items) => {
      console.log(items)
    })
  })
})

app.get("/radio", (req, res) => {
    res.send("radio")
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running"));