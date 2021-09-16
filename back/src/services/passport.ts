const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
import dotenv from "dotenv";
import { User } from "../models/User";
dotenv.config();

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (id: any, done: any) {
    User.findById(id).then((user: any) => {
      done(null, user);
    });
  console.log({ id });
  done(null, id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_BACK_URL,
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      user: any,
      done: any
    ) {
      const existingUser = await User.findOne({ googleId: user.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = await new User({
        googleId: user.id,
        email: user._json.email,
        lastName: user._json.family_name,
        firstName: user._json.given_name,
        picture: user._json.picture,
        createdAt: new Date().toString(),
      }).save();
      return done(null, newUser);
    }
  )
);
