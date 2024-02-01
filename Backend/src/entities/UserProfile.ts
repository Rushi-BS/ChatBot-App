import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    userName: string;

    @Column({})
    phoneNo: number;

    @Column()
    location: string;

    @Column()
    profilePhoto: string;

    @OneToOne(() => User, user => user.userProfile)
    user: User;
}