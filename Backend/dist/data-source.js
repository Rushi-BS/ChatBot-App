"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Chat_1 = require("./entities/Chat");
const Agent_1 = require("./entities/Agent");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Rushi0807",
    database: "chatbot",
    synchronize: true,
    logging: false,
    entities: [User_1.User, User_1.UserProfile, Chat_1.Chat, Chat_1.Query, Chat_1.Response, Agent_1.Agent],
    migrations: [],
    subscribers: [],
});
