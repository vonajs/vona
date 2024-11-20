import { replaceTemplate } from '@cabloy/word-utils';
import { util, z, ZodErrorMap, ZodIssueCode, ZodParsedType } from 'zod';

export type ErrorAdapterFn = (key: string, issue: z.ZodIssueOptionalMessage) => string;

export function setErrorMap(fn: ErrorAdapterFn) {
  const customErrorMap: ZodErrorMap = (issue, ctx) => {
    let message: string;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = fn('ZodError_invalid_type_Required', issue);
        } else {
          message = fn('ZodError_invalid_type_RequiredDetail', issue);
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
        break;
      case ZodIssueCode.unrecognized_keys:
        message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ', ')}`;
        break;
      case ZodIssueCode.invalid_union:
        message = 'Invalid input';
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
        break;
      case ZodIssueCode.invalid_enum_value:
        message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
        break;
      case ZodIssueCode.invalid_arguments:
        message = 'Invalid function arguments';
        break;
      case ZodIssueCode.invalid_return_type:
        message = 'Invalid function return type';
        break;
      case ZodIssueCode.invalid_date:
        message = 'Invalid date';
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === 'object') {
          if ('includes' in issue.validation) {
            message = `Invalid input: must include "${issue.validation.includes}"`;

            if (typeof issue.validation.position === 'number') {
              message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
            }
          } else if ('startsWith' in issue.validation) {
            message = `Invalid input: must start with "${issue.validation.startsWith}"`;
          } else if ('endsWith' in issue.validation) {
            message = `Invalid input: must end with "${issue.validation.endsWith}"`;
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== 'regex') {
          message = `Invalid ${issue.validation}`;
        } else {
          message = 'Invalid';
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === 'array')
          message = `Array must contain ${
            issue.exact ? 'exactly' : issue.inclusive ? 'at least' : 'more than'
          } ${issue.minimum} element(s)`;
        else if (issue.type === 'string')
          message = `String must contain ${
            issue.exact ? 'exactly' : issue.inclusive ? 'at least' : 'over'
          } ${issue.minimum} character(s)`;
        else if (issue.type === 'number')
          message = `Number must be ${
            issue.exact ? 'exactly equal to ' : issue.inclusive ? 'greater than or equal to ' : 'greater than '
          }${issue.minimum}`;
        else if (issue.type === 'date')
          message = `Date must be ${
            issue.exact ? 'exactly equal to ' : issue.inclusive ? 'greater than or equal to ' : 'greater than '
          }${new Date(Number(issue.minimum))}`;
        else message = 'Invalid input';
        break;
      case ZodIssueCode.too_big:
        if (issue.type === 'array')
          message = `Array must contain ${
            issue.exact ? 'exactly' : issue.inclusive ? 'at most' : 'less than'
          } ${issue.maximum} element(s)`;
        else if (issue.type === 'string')
          message = `String must contain ${
            issue.exact ? 'exactly' : issue.inclusive ? 'at most' : 'under'
          } ${issue.maximum} character(s)`;
        else if (issue.type === 'number')
          message = `Number must be ${
            issue.exact ? 'exactly' : issue.inclusive ? 'less than or equal to' : 'less than'
          } ${issue.maximum}`;
        else if (issue.type === 'bigint')
          message = `BigInt must be ${
            issue.exact ? 'exactly' : issue.inclusive ? 'less than or equal to' : 'less than'
          } ${issue.maximum}`;
        else if (issue.type === 'date')
          message = `Date must be ${
            issue.exact ? 'exactly' : issue.inclusive ? 'smaller than or equal to' : 'smaller than'
          } ${new Date(Number(issue.maximum))}`;
        else message = 'Invalid input';
        break;
      case ZodIssueCode.custom:
        message = 'Invalid input';
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = 'Intersection results could not be merged';
        break;
      case ZodIssueCode.not_multiple_of:
        message = `Number must be a multiple of ${issue.multipleOf}`;
        break;
      case ZodIssueCode.not_finite:
        message = 'Number must be finite';
        break;
      default:
        message = ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };

  z.setErrorMap(customErrorMap);
}

export function translateError(message: string, issue: z.ZodIssueOptionalMessage) {
  return replaceTemplate(message, issue)!;
}
