import "reflect-metadata"
import { DataSource } from "typeorm"
import { User} from "./entities/User"
import { UserProfile } from "./entities/UserProfile"
import { Chat } from "./entities/Chat"
import { Query } from "./entities/Query"
import { Response } from "./entities/Response"
import { Agent } from "./entities/Agent"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "chanel",
    database: "chatbot",
    synchronize: true,
    logging: false,
    entities: [User, UserProfile, Chat, Query, Response, Agent],
    migrations: [],
    subscribers: [],
})
