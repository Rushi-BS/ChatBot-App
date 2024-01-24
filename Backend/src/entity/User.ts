import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Relation} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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

    @OneToOne(() => UserProfile, userProfile => userProfile.user)
    @JoinColumn()
    userProfile: Relation<UserProfile>; 
}

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

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