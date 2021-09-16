import express from "express";
const passport = require("passport");
const router = express.Router();

router.get("/failed", (req, res) => {
  res.send("Failed");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req: any, res) {
    res.redirect("http://localhost:3000/");
  }
);

router.get("/logout", (req: any, res) => {
  req.session = null;
  req.logout();
  res.redirect("http://localhost:3000/");
});

router.get("/current_user", (req: any, res) => {
  res.send(req.user);
});

module.exports = router;
