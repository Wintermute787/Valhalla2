const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  characterName: {
    type: String,
    require: true
  },
  level: {
    type: Number,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  items: {
    type: [String]
  },
  job: {
    type: String,
    required: true
  }
});

module.exports = Character = mongoose.model("character", characterSchema);
