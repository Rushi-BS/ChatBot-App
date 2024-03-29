import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./Chat";
import { Response } from "./Response";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    agentName: string;

    @Column()
    issueAttended: number;

    @Column()
    rating: number;

    @OneToMany(() => Chat, chat => chat.agent)
    chats: Chat[];

    @OneToMany(() => Response, response => response.agent)
    responses: Response[];
}