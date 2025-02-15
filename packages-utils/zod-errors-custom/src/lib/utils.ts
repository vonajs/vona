import type { z } from 'zod';
import { replaceTemplate } from '@cabloy/word-utils';
import { util, ZodIssueCode } from 'zod';

export type LocaleAdapterFn = (text: string, ...args: any[]) => string;

export function translateIssue(localeAdapterFn: LocaleAdapterFn, issue: any) {
  issue = { ...issue };
  for (const field of ['expected', 'received', 'validation']) {
    if (issue[field] && typeof issue[field] === 'string') {
      const key = field === 'validation' ? `ZodError_validations_${issue[field]}` : `ZodError_types_${issue[field]}`;
      const value = localeAdapterFn(key);
      if (value !== key) {
        issue[field] = value;
      }
    }
  }

  return issue;
}

export function prepareIssue(localeAdapterFn: LocaleAdapterFn, issue: z.ZodIssueOptionalMessage) {
  // issue
  issue = translateIssue(localeAdapterFn, issue);
  // issue
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      break;
    case ZodIssueCode.invalid_literal:
      issue.expected = JSON.stringify(issue.expected, util.jsonStringifyReplacer);
      break;
    case ZodIssueCode.unrecognized_keys:
      issue.keys = util.joinValues(issue.keys, ', ') as any;
      break;
    case ZodIssueCode.invalid_union:
      break;
    case ZodIssueCode.invalid_union_discriminator:
      issue.options = util.joinValues(issue.options) as any;
      break;
    case ZodIssueCode.invalid_enum_value:
      issue.options = util.joinValues(issue.options) as any;
      break;
    case ZodIssueCode.invalid_arguments:
      break;
    case ZodIssueCode.invalid_return_type:
      break;
    case ZodIssueCode.invalid_date:
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('includes' in issue.validation) {
          if (typeof issue.validation.position === 'number') {
            issue.message = translateError(localeAdapterFn, 'ZodError_invalid_string_includes', issue);
          }
        } else if ('startsWith' in issue.validation) {
          // donothing
        } else if ('endsWith' in issue.validation) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.validation !== 'regex') {
        // donothing
      } else {
        // donothing
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === 'array') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'string') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'number') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'date') {
        const minimum = new Date(Number(issue.minimum)).toString() as any;
        if (issue.exact) {
          issue.minimum = minimum;
        } else if (issue.inclusive) {
          issue.minimum = minimum;
        } else {
          issue.minimum = minimum;
        }
      } else {
        // donothing
      }
      break;
    case ZodIssueCode.too_big:
      if (issue.type === 'array') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'string') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'number') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'bigint') {
        if (issue.exact) {
          // donothing
        } else if (issue.inclusive) {
          // donothing
        } else {
          // donothing
        }
      } else if (issue.type === 'date') {
        const maximum = new Date(Number(issue.maximum)).toString() as any;
        if (issue.exact) {
          issue.maximum = maximum;
        } else if (issue.inclusive) {
          issue.maximum = maximum;
        } else {
          issue.maximum = maximum;
        }
      } else {
        // donothing
      }
      break;
    case ZodIssueCode.custom:
      break;
    case ZodIssueCode.invalid_intersection_types:
      break;
    case ZodIssueCode.not_multiple_of:
      break;
    case ZodIssueCode.not_finite:
      break;
    default:
      break;
  }
  return issue;
}

export function translateError(localeAdapterFn: LocaleAdapterFn, key: string, issue?: z.ZodIssueOptionalMessage) {
  // 1. pre translate
  const content = localeAdapterFn(key);
  // 2. temp translate
  const [, args] = _replaceTemplate(content, issue);
  if (args.length === 0) return content;
  let message = localeAdapterFn(key, ...args);
  // 3. extact translate
  message = replaceTemplate(message, issue)!;
  return message;
}

function _replaceTemplate(content: string, scope?: object | undefined): [string, any[]] {
  if (!content) return [content, []];
  if (!scope) return [content, []];
  const args: any[] = [];
  content = content.toString().replace(/(\\)?\{\{ *([\w.]+) *\}\}/g, (block, skip, key) => {
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
