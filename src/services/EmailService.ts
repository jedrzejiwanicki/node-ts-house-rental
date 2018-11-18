import {getRepository, Repository } from "typeorm";
import { validate } from 'class-validator';

import { Email } from "../entity/Email";

export class EmailService {
    emailRepository: Repository<Email> = getRepository(Email);

    async getOne(constraints: any ): Promise<Email> {
        return this.emailRepository.findOne(constraints);
    }

    async create(email: string): Promise<Email> {
        const newEmail: Email = this.emailRepository.create({ email });

        return this.emailRepository.save(newEmail);
    }
}