const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  session_id: { type: String, required: true },
  session_deadline: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema);