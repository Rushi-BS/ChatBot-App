import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Agent } from "./Agent";
import { User } from "./User";
import { Query } from "./Query";
import { Response } from "./Response";

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