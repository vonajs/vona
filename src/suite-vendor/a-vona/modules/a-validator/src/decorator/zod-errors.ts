import { replaceTemplate } from '@cabloy/word-utils';
import { util, z, ZodErrorMap, ZodIssueCode, ZodParsedType } from 'zod';

export type ErrorAdapterFn = (text: string, ...args: any[]) => string;

export function setErrorMap(fnAdapter: ErrorAdapterFn) {
  function _replaceTemplate(content: string, scope?: object | undefined): [string, any[]] {
    if (!content) return [content, []];
    if (!scope) return [content, []];
    const args: any[] = [];
    content = content.toString().replace(/(\\)?{{ *([\w\.]+) *}}/g, (block, skip, key) => {
      if (skip) {
        return block.substring(skip.length);
      }
      let value = getProperty(scope, key);
      value = value !== undefined ? value : '';
      args.push(value);
      return '%s';
    });
    return [content, args];
  }
  function _t(key: string, issue?: z.ZodIssueOptionalMessage) {
    // 1. pre translate
    const content = fnAdapter(key);
    // 2. temp translate
    const [, args] = _replaceTemplate(content, issue);
    let message = fnAdapter(key, ...args);
    // 3. extact translate
    message = replaceTemplate(message, issue)!;
    return message;
  }

  function _translateIssue(issue: any) {
    for (const field of ['expected', 'received', 'validation']) {
      if (issue[field] && typeof issue[field] === 'string') {
        const key = field === 'validation' ? `ZodError_validations_${issue[field]}` : `ZodError_types_${issue[field]}`;
        const value = fnAdapter(key);
        if (value !== key) {
          issue[field] = value;
        }
      }
    }
  }
  // error map
  const customErrorMap: ZodErrorMap = (issue, ctx) => {
    // issue
    _translateIssue(issue);
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
        message = _t('ZodError_invalid_literal', {
          ...issue,
          expected: JSON.stringify(issue.expected, util.jsonStringifyReplacer),
        });
        break;
      case ZodIssueCode.unrecognized_keys:
        message = _t('ZodError_unrecognized_keys', { ...issue, keys: util.joinValues(issue.keys, ', ') as any });
        break;
      case ZodIssueCode.invalid_union:
        message = _t('ZodError_invalid_union');
        break;
      case ZodIssueCode.invalid_union_discriminator:
        message = _t('ZodError_invalid_union_discriminator', {
          ...issue,
          options: util.joinValues(issue.options) as any,
        });
        break;
      case ZodIssueCode.invalid_enum_value:
        message = _t('ZodError_invalid_enum_value', { ...issue, options: util.joinValues(issue.options) as any });
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
              message = _t('ZodError_invalid_string_includes_position', { ...issue, message });
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
          const minimum = new Date(Number(issue.minimum)).toString() as any;
          if (issue.exact) {
            message = _t('ZodError_too_small_date_exact', { ...issue, minimum });
          } else if (issue.inclusive) {
            message = _t('ZodError_too_small_date_inclusive', { ...issue, minimum });
          } else {
            message = _t('ZodError_too_small_date_not_inclusive', { ...issue, minimum });
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
          const maximum = new Date(Number(issue.maximum)).toString() as any;
          if (issue.exact) {
            message = _t('ZodError_too_big_date_exact', { ...issue, maximum });
          } else if (issue.inclusive) {
            message = _t('ZodError_too_big_date_inclusive', { ...issue, maximum });
          } else {
            message = _t('ZodError_too_big_date_not_inclusive', { ...issue, maximum });
          }
        } else {
          message = _t('ZodError_invalid_input');
        }
        break;
      case ZodIssueCode.custom:
        message = _t('ZodError_custom');
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

export function translateError(message: string, issue?: z.ZodIssueOptionalMessage) {
  return replaceTemplate(message, issue)!;
}

function getProperty(obj, name, sep?) {
  return _getProperty(obj, name, sep, false);
}

function _getProperty(obj, name, sep, forceObject) {
  if (!obj) return undefined;
  const names = name.split(sep || '.');
  // loop
  for (const name of names) {
    if (obj[name] === undefined || obj[name] === null) {
      if (forceObject) {
        obj[name] = {};
      } else {
        obj = obj[name];
        break;
      }
    }
    obj = obj[name];
  }
  return obj;
}
