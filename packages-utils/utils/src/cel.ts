import type * as CelJS from 'cel-js' with { 'resolution-mode': 'import' };
import * as celjs from 'cel-js';

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
