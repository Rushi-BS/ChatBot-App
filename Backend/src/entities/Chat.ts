import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./Agent";
import { User } from "./User";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    chatName: string;

    @ManyToOne(() => User, user => user.chats)
    startBy: User;

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
    id: string;

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
    id: string;

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