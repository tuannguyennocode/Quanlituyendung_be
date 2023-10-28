import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { parse, isValid, isDate, format } from 'date-fns';

export function IsDateFormat(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'IsDateFormat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    // Parse the date string
                    const parsedDate = parse(value, 'dd/MM/yyyy', new Date());

                    // Check if parsing is successful and the result is a valid Date
                    return isDate(parsedDate) && isValid(parsedDate);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be a valid date in the format dd:MM:yyyy`;
                },
            },
        });
    };
}
