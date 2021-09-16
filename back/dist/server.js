"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const { MongoClient } = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const health_1 = require("./routes/health");
const swaggerOptions_1 = require("./swaggerOptions");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./services/passport");
var cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const expressSwagger = require("express-swagger-generator")(app);
expressSwagger(swaggerOptions_1.swaggerOptions);
app.use(cors());
app.use(cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 30 * 24 * 60 * 60 * 1000,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/health", health_1.healthRoute);
app.use("/", require("./routes/auth"));
const PORT = process.env.PORT || 3030;
const start = () => app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
mongoose
    .connect(process.env.DB_ACCESS)
    .then(() => {
    console.log("Base de donnée connectée");
    start();
})
    .catch((err) => console.warn(err));
