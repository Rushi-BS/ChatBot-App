import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: true })
    userName: string;

    @Column({ nullable: true })
    phoneNo: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    profilePhoto: string;

    @OneToOne(() => User, user => user.userProfile)
    user: User;
}