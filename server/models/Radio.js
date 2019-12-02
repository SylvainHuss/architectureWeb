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

/**
 * generic find function
 */
function find_by(filter, callback) {
  db.collection("radios")
    .find(filter)
    .sort({ title: 1 })
    .toArray(callback);
}

function update_one(filter, update, callback) {
  db.collection("radios").findOneAndUpdate(
    filter,
    update,
    { returnOriginal: false },
    callback
  );
}

/**
 * get specific radios
 */
function get_radio(req, res) {
  // /api/radios/:id
  const { id } = req.params;
  db.collection("radios").findOne({ _id: id }, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
}

/**
 * get radios with a specific query
 */
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

/**
 * get all radios
 */
function get_all_radios(req, res) {
  find_by({}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

/**
 * get only untested radios (N == 0)
 */
function get_untested_radios(req, res) {
  find_by({ N: 0 }, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

/**
 * get working radios (where working == true)
 */
function get_working_radios(req, res) {
  find_by({ current_status: true }, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

/**
 * clear N and n if N or n > 0
 */
function clear_radios(req, res) {
  db.collection("radios").updateMany(
    {
      $or: [{ N: { $gt: 0 } }, { n: { $gt: 0 } }]
    },
    { $set: { N: 0, n: 0 } },
    (err, docs) => {
      if (err) console.log(err);
      res.json({
        ok: docs.result.ok,
        nModified: docs.result.nModified
      });
    }
  );
}

/**
 * update N and/or n by 1
 */
function update_radio(req, res) {
  const { id } = req.params;
  const { state, valid } = req.query;
  if (state !== undefined) update_state(id, res, state);
  if (valid !== undefined) update_valid(id, res, valid);
}

/**
 * update the state of a radio
 */
function update_state(id, res, state) {
  let score = {};
  if (state === "down") {
    // radio is down => update total
    score = { N: 1 };
  }
  if (state === "up") {
    // radio is up => update total and inc working radio
    score = { N: 1, n: 1 };
  }
  update_one({ _id: id }, { $inc: score }, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

/**
 * update the validy of a radio
 */
function update_valid(id, res, validity) {
  update_one({ _id: id }, { current_status: validity }, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

module.exports = {
  get_radio,
  get_radios,
  update_radio,
  clear_radios
};
