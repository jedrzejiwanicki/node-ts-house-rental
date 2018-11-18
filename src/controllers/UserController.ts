import { Request } from 'express';
import { JsonController, Param, Get, Req, Post, Body } from 'routing-controllers';
import { getRepository, Repository } from 'typeorm'

import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import { Authorized } from "../decorators/Authrorized";

@JsonController('/users')
export class UserController {
    private userRepository: Repository<User>;
    constructor() {
        this.userRepository = getRepository(User);
    }

    @Get('/:id')
    // @Authorized()
    getOne(@Req() request: Request, @Param('id') id: number): Promise<User> {
        return new UserService().getOneById(id);
    }

    @Post()
    async create(@Req() request: Request): Promise<User> {
        const { body } = request;

        return new UserService().create(body);
    }
}