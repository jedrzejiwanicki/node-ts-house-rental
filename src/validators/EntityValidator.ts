import { validate, ValidationError } from 'class-validator';
import { NotAcceptableError } from 'routing-controllers';

export class EntityValidator {
    entity: any;
    constructor(entity) {
        this.entity = entity;
    }
    async validate() {
        const [error] = await validate(this.entity);

        if(error && error instanceof ValidationError) throw new NotAcceptableError(JSON.stringify(error))
    }
}