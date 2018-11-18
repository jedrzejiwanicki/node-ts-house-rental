import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { EmailService } from '../services/EmailService';
import { Email } from '../entity/Email';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {

    async validate(email: string, args: ValidationArguments) {
        const foundEmail: Email = await new EmailService().getOne({ where: { email } });

        if (foundEmail) {
            throw new UnprocessableEntity('email_must_be_unique', 'Email must be unique!')
        }

        return true
    }
}

export function UniqueEmail(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmailValidator
        });
    };
}