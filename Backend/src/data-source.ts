import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, UserProfile } from "./entity/User"
import { Chat, Query, Response } from "./entity/Chat"
import { Agent } from "./entity/Agent"

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
