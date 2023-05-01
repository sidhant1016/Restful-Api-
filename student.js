const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });
  
  const User = mongoose.model('student', userSchema);
  
  module.exports = student;