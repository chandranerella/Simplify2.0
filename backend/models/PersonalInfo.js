const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // or use user ID if preferred
  name: { type: String, required: true },
  location: { type: String, required: true },
  birthday: { type: String, required: true },
  ethnicity: { type: String, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);
