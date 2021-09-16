"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
/**
 * Get the health of the server
 * @route GET /health
 * @returns {object} 200 - An object with uptime, message and date
 * @returns {Error}  404 - Unexpected error
 */
const getHealth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date()
        };
        res.status(200).json({ data });
    }
    catch (error) {
        res.status(404).json({ message: "erreur" });
    }
});
exports.getHealth = getHealth;
