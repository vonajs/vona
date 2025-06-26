import type * as Celjs from 'cel-js' with { 'resolution-mode': 'import' };
import type { CstNode } from 'chevrotain';
import * as celjs from 'cel-js';
import { isNil } from './check.ts';

export const CeljsPrefix = '#!#';

export function evaluateExpressions(
  expressions: any,
  context?: Record<string, unknown>,
  functions?: Record<string, CallableFunction>,
  dry?: boolean,
): unknown {
  if (isNil(expressions)) return _returnExpressionWithDry(expressions, dry);
  if (Array.isArray(expressions)) {
    return expressions.map(item => _evaluateExpressionInner(item, context, functions, dry));
  } else if (typeof expressions === 'object') {
    const res = {};
    for (const key in expressions) {
      res[key] = _evaluateExpressionInner(expressions[key], context, functions, dry);
    }
    return res;
  }
  // others
  return _evaluateExpressionInner(expressions, context, functions, dry);
}

function _evaluateExpressionInner(
  expression: any,
  context?: Record<string, unknown>,
  functions?: Record<string, CallableFunction>,
  dry?: boolean,
): unknown {
  if (isNil(expression)) return _returnExpressionWithDry(expression, dry);
  if (typeof expression === 'object') return evaluateExpressions(expression, context, functions, dry);
  if (typeof expression !== 'string') return _returnExpressionWithDry(expression, dry);
  if (!expression.startsWith(CeljsPrefix)) return _returnExpressionWithDry(expression, dry);
  return dry ? true : evaluate(expression.substring(CeljsPrefix.length), context, functions);
}

function _returnExpressionWithDry(expression: any, dry?: boolean) {
  return dry ? false : expression;
}

export function evaluate(
  expression: CstNode | string,
  context?: Record<string, unknown>,
  functions?: Record<string, CallableFunction>,
): unknown {
  // functions
  functions = _prepareFunctions(functions);
  // CstNode
  if (typeof expression === 'object' && expression.children) {
    return celjs.evaluate(expression, context, functions);
  }
  // string
  if (typeof expression === 'string') {
    if (expression.startsWith(CeljsPrefix)) {
      return expression.substring(CeljsPrefix.length);
    }
    return celjs.evaluate(expression, context, functions);
  }
  // others
  return expression;
}

export function parse(expression: string): Celjs.ParseResult {
  return celjs.parse(expression);
}

function _prepareFunctions(functions?: Record<string, CallableFunction>) {
  return Object.assign({
    concat: (...args) => {
      return args.reduce((accumulator, current) => `${accumulator}${current}`, '');
    },
  }, functions);
}
