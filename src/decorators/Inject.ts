import {Token} from '../entity/Token';
import {throwUnauthorizedError} from '../errors/UnauthorizedError';
import {TokenHelper} from '../helpers/TokenHelper';
import {TokenService} from '../services/TokenService';

export function Inject(what): Function {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        target[what] = 'x'
        return 'x'
        //return (a) => { console.log(a); return 'x' }
        };
    }