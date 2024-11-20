import { replaceTemplate } from '@cabloy/word-utils';
import { util, z, ZodErrorMap, ZodIssueCode, ZodParsedType } from 'zod';

export type ErrorAdapterFn = (key: string, issue?: z.ZodIssueOptionalMessage) => string;

export function setErrorMap(fn: ErrorAdapterFn) {
  const customErrorMap: ZodErrorMap = (issue, ctx) => {
    let message: string;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = fn('ZodError_invalid_type_required');
        } else {
          message = fn('ZodError_invalid_type_requiredDetail', issue);
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = fn('ZodError_invalid_literal', {
          ...issue,
          expected: JSON.stringify(issue.expected, util.jsonStringifyReplacer),
        });
        break;
      case ZodIssueCode.unrecognized_keys:
        message = fn('ZodError_unrecognized_keys', { ...issue, keys: util.joinValues(issue.keys, ', ') as any });
        break;
      case ZodIssueCode.invalid_union:
        message = fn('ZodError_invalid_union');
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = fn('ZodError_invalid_union_discriminator', {
          ...issue,
          options: util.joinValues(issue.options) as any,
        });
        break;
      case ZodIssueCode.invalid_enum_value:
        message = fn('ZodError_invalid_enum_value', { ...issue, options: util.joinValues(issue.options) as any });
        break;
      case ZodIssueCode.invalid_arguments:
        message = fn('ZodError_invalid_arguments');
        break;
      case ZodIssueCode.invalid_return_type:
        message = fn('ZodError_invalid_return_type');
        break;
      case ZodIssueCode.invalid_date:
        message = fn('ZodError_invalid_date');
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === 'object') {
          if ('includes' in issue.validation) {
            message = fn('ZodError_invalid_string_includes', issue);

            if (typeof issue.validation.position === 'number') {
              message = fn('ZodError_invalid_string_includes_position', { ...issue, message });
            }
          } else if ('startsWith' in issue.validation) {
            message = fn('ZodError_invalid_string_startsWith', issue);
          } else if ('endsWith' in issue.validation) {
            message = fn('ZodError_invalid_string_endsWith', issue);
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== 'regex') {
          message = fn('ZodError_invalid_string_none_regex', issue);
        } else {
          message = fn('ZodError_invalid_string');
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

export function translateError(message: string, issue?: z.ZodIssueOptionalMessage) {
  return replaceTemplate(message, issue)!;
}
