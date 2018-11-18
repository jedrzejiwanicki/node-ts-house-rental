import {Entity, Generated, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert} from 'typeorm';
import { User } from './User';
import { UpdatedCreatedDate } from "./UpdatedCreatedDate";

@Entity()
export class Token extends UpdatedCreatedDate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Generated('uuid')
    token: string;

    @ManyToOne(type => User, user => user.token)
    user: User;

    @BeforeInsert()
    lol() {
        console.log(this)
    }

}
