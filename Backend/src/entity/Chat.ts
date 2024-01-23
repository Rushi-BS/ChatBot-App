import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    chatId: number;
    
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
}