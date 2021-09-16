"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = void 0;
const requireLogin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must log in!" });
    }
    next();
};
exports.requireLogin = requireLogin;
