const mongoose = require("mongoose");

const adTypeSchema = new mongoose.Schema({
  adverisementId: { type: Number, required: true },
  adType: { type: String, required: true },
  description: { type: String, required: true },
  ImageBase64: { type: String, required: true },
  name: { type: String, required: true },
  
});

const Advertisement = mongoose.model("Advertisement", adTypeSchema);

module.exports = Advertisement;


