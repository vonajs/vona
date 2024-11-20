import { replaceTemplate } from '@cabloy/word-utils';
import { util, z, ZodErrorMap, ZodIssueCode, ZodParsedType } from 'zod';

export type ErrorAdapterFn = (key: string, issue?: z.ZodIssueOptionalMessage) => string;

export function setErrorMap(fn: ErrorAdapterFn) {
  const customErrorMap: ZodErrorMap = (issue, ctx) => {
    let message: string;
    _translateIssue(fn, issue);
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
        if (issue.type === 'array') {
          if (issue.exact) {
            message = fn('ZodError_too_small_array_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_small_array_inclusive', issue);
          } else {
            message = fn('ZodError_too_small_array_not_inclusive', issue);
          }
        } else if (issue.type === 'string') {
          if (issue.exact) {
            message = fn('ZodError_too_small_string_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_small_string_inclusive', issue);
          } else {
            message = fn('ZodError_too_small_string_not_inclusive', issue);
          }
        } else if (issue.type === 'number') {
          if (issue.exact) {
            message = fn('ZodError_too_small_number_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_small_number_inclusive', issue);
          } else {
            message = fn('ZodError_too_small_number_not_inclusive', issue);
          }
        } else if (issue.type === 'date') {
          const minimum = new Date(Number(issue.minimum)).toString() as any;
          if (issue.exact) {
            message = fn('ZodError_too_small_date_exact', { ...issue, minimum });
          } else if (issue.inclusive) {
            message = fn('ZodError_too_small_date_inclusive', { ...issue, minimum });
          } else {
            message = fn('ZodError_too_small_date_not_inclusive', { ...issue, minimum });
          }
        } else {
          message = fn('ZodError_invalid_input');
        }
        break;
      case ZodIssueCode.too_big:
        if (issue.type === 'array') {
          if (issue.exact) {
            message = fn('ZodError_too_big_array_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_big_array_inclusive', issue);
          } else {
            message = fn('ZodError_too_big_array_not_inclusive', issue);
          }
        } else if (issue.type === 'string') {
          if (issue.exact) {
            message = fn('ZodError_too_big_string_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_big_string_inclusive', issue);
          } else {
            message = fn('ZodError_too_big_string_not_inclusive', issue);
          }
        } else if (issue.type === 'number') {
          if (issue.exact) {
            message = fn('ZodError_too_big_number_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_big_number_inclusive', issue);
          } else {
            message = fn('ZodError_too_big_number_not_inclusive', issue);
          }
        } else if (issue.type === 'bigint') {
          if (issue.exact) {
            message = fn('ZodError_too_big_number_exact', issue);
          } else if (issue.inclusive) {
            message = fn('ZodError_too_big_number_inclusive', issue);
          } else {
            message = fn('ZodError_too_big_number_not_inclusive', issue);
          }
        } else if (issue.type === 'date') {
          const maximum = new Date(Number(issue.maximum)).toString() as any;
          if (issue.exact) {
            message = fn('ZodError_too_big_date_exact', { ...issue, maximum });
          } else if (issue.inclusive) {
            message = fn('ZodError_too_big_date_inclusive', { ...issue, maximum });
          } else {
            message = fn('ZodError_too_big_date_not_inclusive', { ...issue, maximum });
          }
        } else {
          message = fn('ZodError_invalid_input');
        }
        break;
      case ZodIssueCode.custom:
        message = fn('ZodError_custom');
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = fn('ZodError_invalid_intersection_types');
        break;
      case ZodIssueCode.not_multiple_of:
        message = fn('ZodError_not_multiple_of', issue);
        break;
      case ZodIssueCode.not_finite:
        message = fn('ZodError_not_finite');
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

function _translateIssue(fn: ErrorAdapterFn, issue: any) {
  for (const field of ['expected', 'received', 'validation']) {
    if (issue[field] && typeof issue[field] === 'string') {
      const key = field === 'validation' ? `ZodError_validations_${issue[field]}` : `ZodError_types_${issue[field]}`;
      const value = fn(key);
      if (value !== key) {
        issue[field] = value;
      }
    }
  }
}
