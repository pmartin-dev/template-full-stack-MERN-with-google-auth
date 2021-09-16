import express from "express";
const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
import { healthRoute } from "./routes/health";
import { swaggerOptions } from "./swaggerOptions"

dotenv.config();

const app = express();
const expressSwagger = require('express-swagger-generator')(app)

expressSwagger(swaggerOptions)

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 3030;

const start = () =>
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });

const client = new MongoClient(process.env.DB_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err: any) => {
  if(err) return console.log("Erreur lors de la connexion à la base de donnée", err)
  console.log("Connecté à la base de donnée")
  start()
});


app.use("/health", healthRoute)
