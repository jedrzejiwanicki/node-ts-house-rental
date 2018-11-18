import { getRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';


import { User } from "../entity/User";
import { Token } from "../entity/Token";
import { UserService } from "./UserService";
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

export class TokenService {
    private tokenRepository: Repository<Token> = getRepository(Token);

    async getOne(token): Promise<Token> {
        return this.tokenRepository.findOne({ where: { token }, relations: ['user'] })
    }


    async create(body): Promise<Token> {
        const { password, email } = body;

        const user: User = await new UserService().getOneByEmail(email);

        const isMatchingPassword = await bcrypt.compare(password, user.password);

        if (!isMatchingPassword) throw new UnprocessableEntity('incorrect_credentials', 'Credentials are incorrect')

        const token: Token = this.tokenRepository.create({ user });
        const { id } = await this.tokenRepository.save(token);

        return this.tokenRepository.findOne({ where: { id } })
    }
}