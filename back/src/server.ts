import express from "express";
// const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
import { healthRoute } from "./routes/health";
import { swaggerOptions } from "./swaggerOptions";
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./services/passport");
var cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const expressSwagger = require("express-swagger-generator")(app);
expressSwagger(swaggerOptions);

app.use(cors());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/health", healthRoute);
app.use("/", require("./routes/auth"));

const PORT = process.env.PORT || 3030;

const start = () =>
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });

mongoose
  .connect(process.env.DB_ACCESS)
  .then(() => {
    console.log("Base de donnée connectée");
    start();
  })
  .catch((err: any) => console.warn(err));
