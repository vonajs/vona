import type { Constructable } from 'vona';
import type z from 'zod';

export type SchemaLikeCreate = (schema: any) => any; // not use z.ZodSchema
export type SchemaLike = SchemaLikeCreate | z.ZodSchema | Constructable;

export const SymbolDecoratorRule = Symbol('SymbolDecoratorRule');
export const SymbolDecoratorRuleColumn = Symbol('SymbolDecoratorRuleColumn');
