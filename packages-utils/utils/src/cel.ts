import type * as Celjs from '@cabloy/cel-js' with { 'resolution-mode': 'import' };
import type { CstNode } from 'chevrotain';
import * as celjs from '@cabloy/cel-js';
import { isNil } from './check.ts';
import { hashkey } from './hash.ts';
import { StringPrefixCel, StringPrefixRaw } from './types.ts';
import { getProperty } from './utils.ts';

export function evaluateExpressions<T = any>(
  expressions: any,
  context?: object,
  functions?: Record<string, CallableFunction>,
  dry?: boolean,
): T {
  if (isNil(expressions)) return _returnExpressionWithDry(expressions, dry);
  if (Array.isArray(expressions)) {
    return expressions.map(item => _evaluateExpressionInner(item, context, functions, dry)) as any;
  } else if (typeof expressions === 'object') {
    const res = {};
    for (const key in expressions) {
      res[key] = _evaluateExpressionInner(expressions[key], context, functions, dry);
    }
    return res as any;
  }
  // others
  return _evaluateExpressionInner(expressions, context, functions, dry);
}

function _evaluateExpressionInner<T = any>(
  expression: any,
  context?: object,
  functions?: Record<string, CallableFunction>,
  dry?: boolean,
): T {
  if (isNil(expression)) return _returnExpressionWithDry(expression, dry);
  if (typeof expression === 'object') return evaluateExpressions(expression, context, functions, dry);
  if (typeof expression !== 'string') return _returnExpressionWithDry(expression, dry);
  if (!expression.startsWith(StringPrefixCel)) return _returnExpressionWithDry(expression, dry);
  return dry ? true as any : evaluate(expression.substring(StringPrefixCel.length), context, functions);
}

function _returnExpressionWithDry(expression: any, dry?: boolean) {
  return dry ? false : expression;
}

export function evaluate<T = any>(
  expression: CstNode | string,
  context?: object,
  functions?: Record<string, CallableFunction>,
): T {
  // functions
  functions = _prepareFunctions(functions);
  // CstNode
  if (typeof expression === 'object' && expression.children) {
    return celjs.evaluate(expression, context as any, functions) as any;
  }
  // string
  if (typeof expression === 'string') {
    if (expression.startsWith(StringPrefixRaw)) {
      return expression.substring(StringPrefixRaw.length) as any;
    }
    return celjs.evaluate(expression, context as any, functions) as any;
  }
  // others
  return expression as any;
}

export function parse(expression: string): Celjs.ParseResult {
  return celjs.parse(expression);
}

function _prepareFunctions(functions?: Record<string, CallableFunction>) {
  return Object.assign({
    concat: (...args): string => {
      return args.reduce((accumulator, current) => `${accumulator}${current}`, '');
    },
    get: (obj: object | undefined, name: string, sep?: string) => {
      return getProperty(obj, name, sep);
    },
    hashkey: (key: any): string => {
      return hashkey(key);
    },
  }, functions);
}
