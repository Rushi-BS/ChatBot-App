import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Relation, OneToMany} from "typeorm";
import { Chat } from "./Chat";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    hashedPassword: string;

    @Column()
    createdAt: Date;

    @Column()
    isActive: boolean;

    @OneToOne(() => UserProfile, userProfile => userProfile.user)
    @JoinColumn()
    userProfile: Relation<UserProfile>; 

    @OneToMany(() => Chat, chat => chat.startBy)
    chats: Chat[];
}

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
    user: Relation<User>; // Used Relation<> type because we're using esm (EcmaScript Modules) instead of commonjs
}