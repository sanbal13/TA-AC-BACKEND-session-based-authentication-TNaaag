const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  type: { admin: false },
  name: { type: String, required: true },
  email: { type: String, lowercase: true },
  password: { type: String, minlength: 5 },
  age: { type: Number, min: 18, max: 80 },
  phone: { type: Number, minlength: 5 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
