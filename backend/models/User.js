const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,        
  city: String,         
  pincode: String       
}, {
  timestamps: true      
});

module.exports = mongoose.model("User", userSchema);