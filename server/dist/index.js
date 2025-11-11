"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const userRoutes_1 = require("./routes/userRoutes");
const recipeRoutes_1 = require("./routes/recipeRoutes");
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use('/user', userRoutes_1.UserRouter);
app.use('/recipe', recipeRoutes_1.RecipeRoutes);
app.get('/', (req, res) => {
    res.send('welcome to my server');
});
app.listen(port, async () => {
    try {
        await database_1.connection;
        console.log('database is connected');
        console.log(`server is running at http://localhost:${port}`);
    }
    catch (error) {
        console.error('Database connection error:', error);
    }
});
//# sourceMappingURL=index.js.map