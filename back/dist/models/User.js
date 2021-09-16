"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
exports.User = mongoose.model('users');
