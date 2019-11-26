const { radios } = require("../radios");

function get_radio(req, res) {
  // /api/radios/:id
  const { id } = req.params;
  const result = radios.find(item => item.id === id);
  res.json(result);
}

function get_radios(req, res) {
  // /api/radios
  res.json(radios);
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
