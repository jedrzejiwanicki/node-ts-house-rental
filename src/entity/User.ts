import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Token } from './Token';
import { UpdatedCreatedDate } from "./UpdatedCreatedDate";
import { Email } from './Email';
@Entity()
export class User extends UpdatedCreatedDate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @OneToMany(type => Token, token => token.user)
    token: Token[];

    @OneToOne(type => Email)
    @JoinColumn()
    email: Email;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}