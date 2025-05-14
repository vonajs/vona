import type { LocaleAdapterFn } from './utils.ts';
import { z } from 'zod';
import { prepareIssue, toRaw, translateError } from './utils.ts';

const SymbolTranslated = Symbol('SymbolTranslated');

const __zodTypes = [
  'ZodString',
  'ZodNumber',
  'ZodBigInt',
  'ZodBoolean',
  'ZodDate',
  'ZodSymbol',
  'ZodUndefined',
  'ZodNull',
  'ZodAny',
  'ZodUnknown',
  'ZodNever',
  'ZodVoid',
  'ZodArray',
  'ZodObject',
  'ZodUnion',
  'ZodDiscriminatedUnion',
  'ZodIntersection',
  'ZodTuple',
  'ZodRecord',
  'ZodMap',
  'ZodSet',
  'ZodFunction',
  'ZodLazy',
  'ZodLiteral',
  'ZodEnum',
  'ZodNativeEnum',
  'ZodPromise',
  'ZodOptional',
  'ZodNullable',
  'ZodDefault',
  'ZodCatch',
  'ZodNaN',
  'ZodBranded',
  'ZodPipeline',
  'ZodReadonly',
];

export function setErrorMapSchema(localeAdapterFn: LocaleAdapterFn) {
  for (const typeName of __zodTypes) {
    const _parseOriginal = z[typeName].prototype._parse;
    z[typeName].prototype._parse = function (this: any, input) {
      if (this._def.errorMap && this._def.errorMap.name === 'customMap' && !this._def._errorMapPatched) {
        const def = toRaw(this._def);
        def._errorMapPatched = true;
        const res = this._def.errorMap({ code: 'invalid_type' }, { defaultError: undefined });
        const key = res.message;
        def.errorMap = (issue, ctx) => {
          if (!key || issue.code !== 'invalid_type') return { message: ctx.defaultError };
          issue = prepareIssue(localeAdapterFn, issue);
          const message = translateError(localeAdapterFn, key, issue);
          return { message };
        };
      }
      const res = _parseOriginal.call(this, input);
      if (this._def.checks && this._def.checks.length > 0) {
        for (const issue of input.parent.common.issues) {
          if (!issue[SymbolTranslated]) {
            issue[SymbolTranslated] = true;
            const issue2 = prepareIssue(localeAdapterFn, issue);
            const message = translateError(localeAdapterFn, issue.message, issue2);
            if (message !== issue.message) {
              issue.message = message;
            }
          }
        }
      }
      return res;
    };
  }
}
