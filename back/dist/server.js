"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { MongoClient } = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const health_1 = require("./routes/health");
const swaggerOptions_1 = require("./swaggerOptions");
dotenv_1.default.config();
const app = (0, express_1.default)();
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(swaggerOptions_1.swaggerOptions);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const PORT = process.env.PORT || 3030;
const start = () => app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
const client = new MongoClient(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
client.connect((err) => {
    if (err)
        return console.log("Erreur lors de la connexion à la base de donnée", err);
    console.log("Connecté à la base de donnée");
    start();
});
app.use("/health", health_1.healthRoute);
