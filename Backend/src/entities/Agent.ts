import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chat } from "./Chat";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    agentName: string;

    @Column()
    issueAttended: number;

    @Column()
    rating: number;

    @OneToMany(() => Chat, chat => chat.agent)
    chats: Chat[];
}