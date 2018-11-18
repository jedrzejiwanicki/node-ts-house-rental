import * as moment from 'moment';

import { Token } from '../entity/Token';
import { getSecondsFromNow } from '../utils/date';
import { TOKEN_LIFE_TIME_S } from '../constants/token';

export class TokenHelper {
    exists(token: Token): boolean {
        return !!token;
    }

    isValid(token: Token): boolean {
        return this.exists(token) && getSecondsFromNow(token.updatedAt) < TOKEN_LIFE_TIME_S;
    }
}