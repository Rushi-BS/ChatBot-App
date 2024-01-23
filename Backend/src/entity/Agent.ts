import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Agent {
    @PrimaryGeneratedColumn()
    agentId: number;

    @Column()
    agentName: string;

    @Column()
    issueAttended: number;

    @Column()
    rating: number;
}