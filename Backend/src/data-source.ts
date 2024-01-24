import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, UserProfile } from "./entities/User"
import { Chat, Query, Response } from "./entities/Chat"
import { Agent } from "./entities/Agent"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Rushi0807",
    database: "chatbot",
    synchronize: true,
    logging: false,
    entities: [User, UserProfile, Chat, Query, Response, Agent],
    migrations: [],
    subscribers: [],
})
