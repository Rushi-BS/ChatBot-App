import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./src/entity/User"
import { UserProfile } from "./src/entity/UserProfile"
import { Query } from "./src/entity/Query"
import { Chat } from "./src/entity/Chat"
import { Agent } from "./src/entity/Agent"

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
