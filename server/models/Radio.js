const { radios } = require("../radios");
const MongoClient = require("mongodb").MongoClient;
const urlRadio = "mongodb://root:123@172.16.0.3:27017/";
let db;

MongoClient.connect(urlRadio, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) throw err;
  db = client.db("radios");
});

function get_radio(req, res) {
  // /api/radios/:id
  const { id } = req.params;
  db.collection("radios").findOne({ _id: id }, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
}

function get_radios(req, res) {
  // /api/radios
  db.collection("radios")
    .find({})
    .toArray((err, docs) => {
      if (err) throw err;
      res.json(docs);
    });
}

function update_radio(req, res) {
  const { id, state } = req.params;
  let action;
  if (state === "down") {
    // radio is down => update total
    action = { N: 1 };
  }
  if (state === "up") {
    // radio is up => update total and inc working
    action = { N: 1, n: 1 }
  }
  db.collection("radios").findOneAndUpdate(
    { _id: id },
    { $inc: action },
    { returnOriginal: false },
    (err, doc) => {
      if (err) throw err;
      res.json(doc.value);
    }
  );
}

module.exports = {
  get_radio,
  get_radios,
  update_radio
};
