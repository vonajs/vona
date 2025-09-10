import type { Constructable } from 'vona';
import type z from 'zod';

export type SchemaLikeCreate = (schema: any) => any; // not use z.ZodType
export type SchemaLike = SchemaLikeCreate | z.ZodType | Constructable;

export const SymbolDecoratorRule = Symbol('SymbolDecoratorRule');
export const SymbolDecoratorRuleColumn = Symbol('SymbolDecoratorRuleColumn');
