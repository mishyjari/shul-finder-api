const mongoose = require('mongoose');

const synagogueSchema = new mongoose.Schema({
  name: { type: String },
  url: { type: String },
  movement: { type: String },
  phone: { type: String },
  zip: { type: String },
  address: { type: String },
  state: { type: String },
  city: { type: String },
});

const Synagogue = mongoose.model('Synagogue', synagogueSchema);
module.exports = Synagogue;
