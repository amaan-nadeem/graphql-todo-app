"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = __importDefault(require("./schemas/schema"));
const app = express_1.default();
// connecting to mongodb
db_1.default();
// adding cors
app.use(cors_1.default());
// graphql setup 
app.use('/graphql', (req, res) => {
    try {
        express_graphql_1.default({
            schema: schema_1.default,
            graphiql: true
        });
    }
    catch (error) {
        res.status(200).send({
            message: "Internal Server Error",
            success: false
        });
    }
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Listening request on Port ${PORT}`));
