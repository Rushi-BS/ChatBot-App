import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Agent } from "./Agent";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chatName: string;

    @Column()
    startBy: number;

    @Column()
    isAgentPresent: boolean;

    @Column()
    endAt: Date;

    @Column()
    isDeleted: boolean;

    @Column()
    rating: number;

    @Column()
    feedback: string;

    @OneToMany(() => Query, query => query.chat)
    queries: Query[];

    @OneToMany(() => Response, response => response.chat)
    responses: Response[];

    @ManyToOne(() => Agent, agent => agent.chats)
    agent: Agent;
}

@Entity()
export class Query {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    timestamp: Date;

    @ManyToOne(() => Chat, chat => chat.queries)
    chat: Chat;
}

@Entity()
export class Response {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    timestamp: Date;

    // @Column()
    // givenBy: number;

    // Foreign key to Agent, nullable for bot responses
    @ManyToOne(() => Agent)
    @JoinColumn()
    agent: Agent;

    // Optional: Explicit field to indicate bot responses
    @Column({ type: 'boolean', nullable: true })
    isBotResponse: boolean;

    @ManyToOne(() => Chat, chat => chat.responses)
    chat: Chat;
}