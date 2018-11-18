import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';

import { UpdatedCreatedDate } from './UpdatedCreatedDate';
import { UniqueEmail } from '../validators/UniqueEmail';
import { EntityValidator } from '../validators/EntityValidator';

@Entity()
export class Email extends UpdatedCreatedDate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    @UniqueEmail({ message: 'Email must be unique' })
    email: string;

    @BeforeInsert()
    async validate() {
        await new EntityValidator(this).validate();
    }
}