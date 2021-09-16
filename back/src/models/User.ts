const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  firstName: String,
  googleId: String,
  lastName: String,
  picture: String,
  createdAt: String
});

mongoose.model("users", userSchema);
export const User = mongoose.model('users')
