"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes = express_1.default.Router();
routes.get('/todos', (req, res) => {
    res.status(200).json({
        todo: "todo"
    });
});
routes.post('/todo', (req, res) => {
});
routes.put('/todo:id', (req, res) => {
});
routes.delete('/todo:id', (req, res) => {
});
exports.default = routes;
