"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport = require("passport");
const router = express_1.default.Router();
router.get("/failed", (req, res) => {
    res.send("Failed");
});
router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"],
}));
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/failed",
}), function (req, res) {
    res.redirect("http://localhost:3000/");
});
router.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("http://localhost:3000/");
});
router.get("/current_user", (req, res) => {
    res.send(req.user);
});
module.exports = router;
