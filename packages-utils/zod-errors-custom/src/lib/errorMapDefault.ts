import type { ZodErrorMap } from 'zod';
import type { LocaleAdapterFn } from './utils.ts';
import { util, z, ZodIssueCode, ZodParsedType } from 'zod';
import { prepareIssue, translateError } from './utils.ts';

export function setErrorMapDefault(localeAdapterFn: LocaleAdapterFn) {
  function _t(key: string, issue?: z.ZodIssueOptionalMessage) {
    return translateError(localeAdapterFn, key, issue);
  }

  // error map
  const customErrorMap: ZodErrorMap = (issue, ctx) => {
    // issue
    issue = prepareIssue(localeAdapterFn, issue);
    // message
    let message: string;
    switch (issue.code) {
      case ZodIssueCode.invalid_type:
        if (issue.received === ZodParsedType.undefined) {
          message = _t('ZodError_invalid_type_required');
        } else {
          message = _t('ZodError_invalid_type_requiredDetail', issue);
        }
        break;
      case ZodIssueCode.invalid_literal:
        message = _t('ZodError_invalid_literal', issue);
        break;
      case ZodIssueCode.unrecognized_keys:
        message = _t('ZodError_unrecognized_keys', issue);
        break;
      case ZodIssueCode.invalid_union:
        message = _t('ZodError_invalid_union');
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = _t('ZodError_invalid_union_discriminator', issue);
        break;
      case ZodIssueCode.invalid_enum_value:
        message = _t('ZodError_invalid_enum_value', issue);
        break;
      case ZodIssueCode.invalid_arguments:
        message = _t('ZodError_invalid_arguments');
        break;
      case ZodIssueCode.invalid_return_type:
        message = _t('ZodError_invalid_return_type');
        break;
      case ZodIssueCode.invalid_date:
        message = _t('ZodError_invalid_date');
        break;
      case ZodIssueCode.invalid_string:
        if (typeof issue.validation === 'object') {
          if ('includes' in issue.validation) {
            message = _t('ZodError_invalid_string_includes', issue);
            if (typeof issue.validation.position === 'number') {
              message = _t('ZodError_invalid_string_includes_position', issue);
            }
          } else if ('startsWith' in issue.validation) {
            message = _t('ZodError_invalid_string_startsWith', issue);
          } else if ('endsWith' in issue.validation) {
            message = _t('ZodError_invalid_string_endsWith', issue);
          } else {
            util.assertNever(issue.validation);
          }
        } else if (issue.validation !== 'regex') {
          message = _t('ZodError_invalid_string_validation', issue);
        } else {
          message = _t('ZodError_invalid_string');
        }
        break;
      case ZodIssueCode.too_small:
        if (issue.type === 'array') {
          if (issue.exact) {
            message = _t('ZodError_too_small_array_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_small_array_inclusive', issue);
          } else {
            message = _t('ZodError_too_small_array_not_inclusive', issue);
          }
        } else if (issue.type === 'string') {
          if (issue.exact) {
            message = _t('ZodError_too_small_string_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_small_string_inclusive', issue);
          } else {
            message = _t('ZodError_too_small_string_not_inclusive', issue);
          }
        } else if (issue.type === 'number') {
          if (issue.exact) {
            message = _t('ZodError_too_small_number_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_small_number_inclusive', issue);
          } else {
            message = _t('ZodError_too_small_number_not_inclusive', issue);
          }
        } else if (issue.type === 'date') {
          if (issue.exact) {
            message = _t('ZodError_too_small_date_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_small_date_inclusive', issue);
          } else {
            message = _t('ZodError_too_small_date_not_inclusive', issue);
          }
        } else {
          message = _t('ZodError_invalid_input');
        }
        break;
      case ZodIssueCode.too_big:
        if (issue.type === 'array') {
          if (issue.exact) {
            message = _t('ZodError_too_big_array_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_big_array_inclusive', issue);
          } else {
            message = _t('ZodError_too_big_array_not_inclusive', issue);
          }
        } else if (issue.type === 'string') {
          if (issue.exact) {
            message = _t('ZodError_too_big_string_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_big_string_inclusive', issue);
          } else {
            message = _t('ZodError_too_big_string_not_inclusive', issue);
          }
        } else if (issue.type === 'number') {
          if (issue.exact) {
            message = _t('ZodError_too_big_number_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_big_number_inclusive', issue);
          } else {
            message = _t('ZodError_too_big_number_not_inclusive', issue);
          }
        } else if (issue.type === 'bigint') {
          if (issue.exact) {
            message = _t('ZodError_too_big_number_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_big_number_inclusive', issue);
          } else {
            message = _t('ZodError_too_big_number_not_inclusive', issue);
          }
        } else if (issue.type === 'date') {
          if (issue.exact) {
            message = _t('ZodError_too_big_date_exact', issue);
          } else if (issue.inclusive) {
            message = _t('ZodError_too_big_date_inclusive', issue);
          } else {
            message = _t('ZodError_too_big_date_not_inclusive', issue);
          }
        } else {
          message = _t('ZodError_invalid_input');
        }
        break;
      case ZodIssueCode.custom:
        message = _t((<any>issue).customMessage || 'ZodError_custom');
        break;
      case ZodIssueCode.invalid_intersection_types:
        message = _t('ZodError_invalid_intersection_types');
        break;
      case ZodIssueCode.not_multiple_of:
        message = _t('ZodError_not_multiple_of', issue);
        break;
      case ZodIssueCode.not_finite:
        message = _t('ZodError_not_finite');
        break;
      default:
        message = ctx.defaultError;
        util.assertNever(issue);
    }
    return { message };
  };

  z.setErrorMap(customErrorMap);
}
