import passport from "passport";
import PassportLocal from "passport-local";
import UserModel from "../models/user.model";
import bcrypt from "bcrypt";

// Implementing Strategy
passport.use(
  new PassportLocal.Strategy(async (username, password, cb) => {
    try {
      const doc = await UserModel.findOne({ username: username });
      if (!doc) {
        return cb(null, false);
      }
      const isValid = await bcrypt.compare(password, doc.password);
      if (isValid) {
        return cb(null, doc.id);
      } else {
        return cb(null, false);
      }
    } catch (err) {
      console.error(err);
      cb(err);
    }
  })
);

// Passport Helpers
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const doc = await UserModel.findById(id, {
      password: 0,
      email: 0,
      name: 0,
    });
    if (!doc) {
      return cb("ERROR");
    }
    cb(null, doc);
  } catch (err) {
    console.error(err);
  }
});
