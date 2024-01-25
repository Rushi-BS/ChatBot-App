import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./Agent";
import { User } from "./User";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

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
    status(arg0: number) {
        throw new Error("Method not implemented.");
    }
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