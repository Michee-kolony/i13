const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
  titre: { type: String, required: true },
  soustitre: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  categorie: { type: String, required: true },
  createdate:{type:Date, default: Date.now()}
});

module.exports = mongoose.model('Information', infoSchema);
