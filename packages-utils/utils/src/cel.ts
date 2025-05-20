import type * as CelJS from 'cel-js' with { 'resolution-mode': 'import' };
import type { CstNode } from 'chevrotain';
import * as celjs from 'cel-js';
import { isNil } from './check.ts';

export function evaluateExpressions(expressions: any, context?: Record<string, unknown>, functions?: Record<string, CallableFunction>): unknown {
  if (isNil(expressions)) return expressions;
  if (Array.isArray(expressions)) {
    return expressions.map(item => evaluate(item, context, functions));
  } else if (typeof expressions === 'object') {
    const res = {};
    for (const key in expressions) {
      res[key] = evaluate(expressions[key], context, functions);
    }
    return res;
  }
  // others
  return evaluate(expressions, context, functions);
}

export function evaluate(
  expression: CstNode | string,
  context?: Record<string, unknown>,
  functions?: Record<string, CallableFunction>,
): unknown {
  // CstNode
  if (typeof expression === 'object' && expression.children) {
    return celjs.evaluate(expression, context, functions);
  }
  // string
  if (typeof expression === 'string') {
    if (expression.startsWith('##')) {
      return expression.substring('##'.length);
    }
    return celjs.evaluate(expression, context, functions);
  }
  // others
  return expression;
}

export function parse(expression: string): CelJS.ParseResult {
  return celjs.parse(expression);
}
