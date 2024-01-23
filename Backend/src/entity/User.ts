import {Entity, PrimaryGeneratedColumn, Column, Timestamp} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    email: string;

    @Column()
    passwordHash: string;

    @Column()
    salt: string;

    @Column()
    createdAt: Date;

    @Column()
    isActive: boolean;
}