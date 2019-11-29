const MongoClient = require("mongodb").MongoClient;
const urlRadio = "mongodb://root:123@172.16.0.3:27017/";
let db;

MongoClient.connect(
  urlRadio,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    db = client.db("radios");
  }
);

function find_by(filter, callback) {
  db.collection("radios")
    .find(filter)
    .toArray(callback);
}

function get_radio(req, res) {
  // /api/radios/:id
  const { id } = req.params;
  db.collection("radios").findOne({ _id: id }, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
}

function get_radios(req, res) {
  const queries = req.query;
  if (queries.type === "all" || !Object.keys(queries).length) {
    // /api/radios?type=all
    get_all_radios(req, res);
  }
  if (queries.type === "untested") {
    // /api/radios?type=untested
    get_untested_radios(req, res);
  }
  if (queries.type === "working") {
    get_working_radios(req, res);
  }
}

function get_all_radios(req, res) {
  find_by({}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

function get_untested_radios(req, res) {
  find_by({ N: 0 }, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

function get_working_radios(req, res) {
  // algorithm for working radios...
}

function update_radio(req, res) {
  const { id } = req.params;
  const { state } = req.query;
  let action;
  if (state === "down") {
    // radio is down => update total
    action = { N: 1 };
  }
  if (state === "up") {
    // radio is up => update total and inc working
    action = { N: 1, n: 1 };
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
