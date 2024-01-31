import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./Agent";
import { User } from "./User";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    chatName: string;

    @ManyToOne(() => User, (user) => user.chats, {cascade: true})
    startBy: User;

    @Column({ default: false })
    isAgentPresent: boolean;

    @Column()
    startAt: Date;

    @Column({ nullable: true })
    endAt: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ nullable: true })
    rating: number;

    @Column({ nullable: true })
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

    @ManyToOne(() => Chat, chat => chat.queries, {cascade: true})
    chat: Chat;
}

@Entity()
export class Response {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'text'})
    text: string;

    @Column()
    timestamp: Date;

    // Foreign key to Agent, nullable for bot responses 
    @ManyToOne(() => Agent, agent => agent.responses, {nullable: true, cascade: true})
    @JoinColumn({ name: 'givenBy'})
    agent: Agent;

    @ManyToOne(() => Chat, chat => chat.responses, {cascade: true})
    chat: Chat;
}