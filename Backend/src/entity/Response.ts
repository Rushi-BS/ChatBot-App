import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Response{
    @PrimaryGeneratedColumn()
    responseId: number;

    @Column()
    chatId: number;

    @Column()
    text: string;

    @Column()
    timestamp: Date;

    @Column()
    givenBy: number;
}