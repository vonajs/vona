import { ValidationError } from './validationError.js';
import { ValidatorOptions } from './validatorOptions.js';

export interface ValidatorPackage {
  validate(object: unknown, validatorOptions?: ValidatorOptions): ValidationError[] | Promise<ValidationError[]>;
}
