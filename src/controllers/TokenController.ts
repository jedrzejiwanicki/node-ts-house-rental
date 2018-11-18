import { JsonController, Post, Body } from 'routing-controllers';

import { Token } from '../entity/Token';
import { TokenService } from "../services/TokenService";

@JsonController('/token')
export class TokenController {

    @Post()
    async create(@Body() body: any): Promise<Token> {
        return new TokenService().create(body);
    }
}