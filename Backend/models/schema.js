const mongoose = require('mongoose');

const usersschema = mongoose.Schema({
  _id: { type: "ObjectId", required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  session_id: { type: Number, required: true },
  session_deadline: { type: Number, required: true },
},
{
  collection: "users"
});

module.exports = mongoose.model('usersmodel', usersschema);