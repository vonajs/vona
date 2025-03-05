import type * as CelJS from 'cel-js' with { 'resolution-mode': 'import' };
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

export function evaluate(expression: string, context?: Record<string, unknown>, functions?: Record<string, CallableFunction>): unknown {
  if (typeof expression !== 'string') return expression;
  if (expression.startsWith('##')) {
    return expression.substring('##'.length);
  }
  return celjs.evaluate(expression, context, functions);
}

export function parse(expression: string): CelJS.ParseResult {
  return celjs.parse(expression);
}
