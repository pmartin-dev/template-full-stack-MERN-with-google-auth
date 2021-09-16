"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
dotenv_1.default.config();
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (id, done) {
    User_1.User.findById(id).then((user) => {
        done(null, user);
    });
    console.log({ id });
    done(null, id);
});
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_BACK_URL,
    passReqToCallback: true,
}, function (request, accessToken, refreshToken, user, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield User_1.User.findOne({ googleId: user.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        const newUser = yield new User_1.User({
            googleId: user.id,
            email: user._json.email,
            lastName: user._json.family_name,
            firstName: user._json.given_name,
            picture: user._json.picture,
            createdAt: new Date().toString(),
        }).save();
        return done(null, newUser);
    });
}));
