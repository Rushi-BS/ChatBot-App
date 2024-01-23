import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn()
    profileId: number;

    @Column()
    userName: string;

    @Column({})
    phoneNo: number;

    @Column()
    location: string;

    @Column()
    profilePhoto: string;
}
