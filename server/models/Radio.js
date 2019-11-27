const { radios } = require("../radios");
const MongoClient = require("mongodb").MongoClient;
const urlRadio = "mongodb://root:123@172.16.0.3:27017/";
let db;

MongoClient.connect(urlRadio, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;
  db = client.db("radios");
});

function get_radio(req, res) {
  // /api/radios/:id
  const { id } = req.params;
  db.collection("radios").findOne({ _id: id }, (err, doc) => {
    res.json(doc);
  });
}

function get_radios(req, res) {
  // /api/radios
  db.collection("radios")
    .find({})
    .toArray((err, docs) => {
      res.json(docs);
    });
}

function update_radio(req, res) {
  const { id, type } = req.params;
  const idxRadio = radios.findIndex(item => item.id === id);
  if (type === "neg") {
    radios[idxRadio]["n"] -= 1;
  }
  if (type === "pos") {
    radios[idxRadio]["N"] += 1;
  }
  res.json(radios[idxRadio]);
}

module.exports = {
  get_radio,
  get_radios,
  update_radio
};
