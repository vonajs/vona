import type * as Celjs from 'cel-js' with { 'resolution-mode': 'import' };
import type { CstNode } from 'chevrotain';
import * as celjs from 'cel-js';
import { isNil } from './check.ts';

export const CeljsPrefix = '#!#';

export function evaluateExpressions(expressions: any, context?: Record<string, unknown>, functions?: Record<string, CallableFunction>): unknown {
  if (isNil(expressions)) return expressions;
  if (Array.isArray(expressions)) {
    return expressions.map(item => _evaluateExpressionInner(item, context, functions));
  } else if (typeof expressions === 'object') {
    const res = {};
    for (const key in expressions) {
      res[key] = _evaluateExpressionInner(expressions[key], context, functions);
    }
    return res;
  }
  // others
  return _evaluateExpressionInner(expressions, context, functions);
}

function _evaluateExpressionInner(expression: any, context?: Record<string, unknown>, functions?: Record<string, CallableFunction>): unknown {
  if (isNil(expression)) return expression;
  if (typeof expression === 'object') return evaluateExpressions(expression, context, functions);
  if (typeof expression !== 'string') return expression;
  if (!expression.startsWith(CeljsPrefix)) return expression;
  return evaluate(expression.substring(CeljsPrefix.length), context, functions);
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
