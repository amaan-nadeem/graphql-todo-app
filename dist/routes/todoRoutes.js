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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import TodoType from '../schemas/todoSchema';
const Joi = require("@hapi/joi");
const routes = express_1.default.Router();
// @routes POST
// @desc adding todo
// @access public
routes.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).send({});
    }
}));
// @route GET
// @desc Fetching todos
// @access public
routes.get("/get-todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
// @route put
// @desc updating todo
// @access public
routes.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
// @route delete
// @desc deleting todo
// @access public
routes.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.default = routes;
