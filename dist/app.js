"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const db_1 = __importDefault(require("./config/db"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
// connecting database 
db_1.default();
// body parser 
app.use(express_1.default.json());
app.use('/api/v1/', routes_1.default);
// 404 not found
app.use((req, res) => res
    .status(404)
    .send({
    message: `API route not found`,
    route: `${req.hostname}${req.url}`
}));
app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));
// module.exports = app
module.exports = app;
