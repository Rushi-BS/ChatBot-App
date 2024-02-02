import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Chat } from "./Chat";

@Entity()
export class Query {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    text: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => Chat, chat => chat.queries, { cascade: true })
    chat: Chat;
}