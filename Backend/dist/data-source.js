"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const UserProfile_1 = require("./entities/UserProfile");
const Chat_1 = require("./entities/Chat");
const Query_1 = require("./entities/Query");
const Response_1 = require("./entities/Response");
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
    entities: [User_1.User, UserProfile_1.UserProfile, Chat_1.Chat, Query_1.Query, Response_1.Response, Agent_1.Agent],
    migrations: [],
    subscribers: [],
});
