import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Agent } from "./Agent";
import { Chat } from "./Chat";

@Entity()
export class Response {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text' })
    text: string;

    @Column()
    timestamp: Date;

    // Foreign key to Agent, nullable for bot responses 
    @ManyToOne(() => Agent, agent => agent.responses, { nullable: true, cascade: true })
    @JoinColumn({ name: 'givenBy' })
    agent: Agent;

    @ManyToOne(() => Chat, chat => chat.responses, { cascade: true })
    chat: Chat;
}