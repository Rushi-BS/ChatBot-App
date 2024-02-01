import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Relation, OneToMany} from "typeorm";
import { Chat } from "./Chat";
import { UserProfile } from "./UserProfile";

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

    @OneToOne(() => UserProfile, userProfile => userProfile.user, { cascade: true })
    @JoinColumn()
    userProfile: UserProfile; 

    @OneToMany(() => Chat, (chat) => chat.startBy)
    chats: Chat[];
}