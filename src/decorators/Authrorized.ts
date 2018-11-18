import { Token } from "../entity/Token";
import { TokenService } from "../services/TokenService";
import { TokenHelper } from '../helpers/TokenHelper';
import { UnauthorizedError } from "../errors/UnauthorizedError";

export function Authorized(): Function {
	return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
		return {
            ...descriptor,
            value: async function (...args: Array<any>): Promise<any> {
                const [request] = args;
                const { headers: { authorization } } = request;
                const tokenService: TokenService = new TokenService();
                const tokenHelper: TokenHelper = new TokenHelper();

                const token: Token = await tokenService
                    .getOne(authorization);


                if(!tokenHelper.isValid(token)) {
                    throw new UnauthorizedError('authorization_needed', 'User needs to be authenticated!');
                }

                return descriptor.value.call(this, ...args)
            }
	    };
	}
}