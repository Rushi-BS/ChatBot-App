"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const config_1 = __importDefault(require("./config"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const { port } = config_1.default;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Database connection
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Database connected');
}).catch((err) => {
    console.log(err);
});
// Routes
routes_1.default.forEach((route) => {
    // console.log(`Route ${[route.method]} ${route.route}`);
    app[route.method](route.route, route.action);
});
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.listen(port || 3000, () => {
    console.log(`Server is running on port ${port}`);
});
