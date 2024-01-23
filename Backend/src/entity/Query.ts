import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Query
{
    @PrimaryGeneratedColumn()
    queryId: number;

    @Column()
    chatId: number;

    @Column()
    text: string;

    @Column()
    timestamp: Date;
}