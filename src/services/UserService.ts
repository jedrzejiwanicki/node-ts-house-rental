import {NotFoundError} from 'routing-controllers';
import {getRepository, Repository, FindConditions } from "typeorm";

import { EmailService } from './EmailService';
import { User } from "../entity/User";
import { Email } from '../entity/Email';
import { UserSerializer } from '../serializers/user';

interface FindWhereContraints {
    where?: Object,
    relations?: string[],
}

export class UserService {
    userRepository: Repository<User> = getRepository(User);

    async getOne(constraints: FindWhereContraints ): Promise<User> {
        const user: User = await this.userRepository.findOne(constraints)

        if (!user) {
            throw new NotFoundError('user not found')
        }
        return user;
    }

    async getOneById(id: number): Promise<User> {
      const user: User = await this.userRepository.findOne({ where: { id }, relations: ['email'] })

      if (!user) {
        throw new NotFoundError('user not found')
      }

      return new UserSerializer().serialize(user);
    }

    async getOneByEmail(email: string): Promise<User> {
        const user =  await this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.email', 'email')
            .where('email.email = :email', { email })
            .getOne();

        if(!user) throw new NotFoundError('user not found')

        return user
    }

    async create(body): Promise<User> {
        const email: Email = await new EmailService().create(body.email);
        const user: User = this.userRepository.create({
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password,
            email,
        });

        const { id } = await this.userRepository.save(user);
        const data = await this.getOne({ where: { id }, relations: ['email'] });

        return new UserSerializer().serialize(data);

    }
}