"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoute = void 0;
const express_1 = __importDefault(require("express"));
const health_1 = require("../controllers/health");
const router = express_1.default.Router();
exports.healthRoute = router.get('/', health_1.getHealth);
