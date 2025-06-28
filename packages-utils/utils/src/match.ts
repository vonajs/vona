import { evaluateExpressions } from './cel.ts';
import { StringPrefixCel, StringPrefixRegexp } from './types.ts';
import { evaluateSimple } from './utils.ts';

export type TypeMatchSelectorFunction = (this: any, ...args: any[]) => boolean;
export type TypeMatchSelectorRule<T> = T | RegExp | TypeMatchSelectorFunction;
export type TypeMatchSelectorRules<T> = (TypeMatchSelectorRule<T>)[] | TypeMatchSelectorRule<T>;

export function matchSelector<T>(match: TypeMatchSelectorRules<T>, selector: string | boolean, matchThis?: any, ...matchArgs: any[]) {
  if (!Array.isArray(match)) {
    // prepare
    if (typeof match === 'string' && match.startsWith(StringPrefixRegexp)) {
      match = evaluateSimple(match.substring(StringPrefixRegexp.length));
    }
    return (
      (typeof match === 'string' && match.startsWith(StringPrefixCel) && !!evaluateExpressions(match, { selector, context: matchArgs[0], args: matchArgs })) ||
      (typeof match === 'string' && !match.startsWith(StringPrefixCel) && typeof selector === 'string' && match === selector) ||
      (match instanceof RegExp && typeof selector === 'string' && match.test(selector)) ||
      (typeof match === 'function' && (match as any).call(matchThis, selector, ...matchArgs))
    );
  }
  return match.some(item => matchSelector(item, selector));
}
