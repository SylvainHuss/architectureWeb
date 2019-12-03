const MongoClient = require("mongodb").MongoClient;
const urlRadio = "mongodb://root:123@172.16.0.2:27017/";
let db;

MongoClient.connect(
  urlRadio,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) throw err;
    db = client.db("users");
  }
);

/**
 * generic find function
 */
function find_by(filter, callback) {
  db.collection("users")
    .find(filter)
    .toArray(callback);
}

function update_one(filter, update, callback) {
  db.collection("users").findOneAndUpdate(
    filter,
    update,
    { returnOriginal: false },
    callback
  );
}

function get_users(req, res) {
  find_by({}, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

function get_user(req, res) {
  const { id } = req.params;
  find_by({ _id: id }, (err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
}

module.exports = {
  get_users,
  get_user
};
