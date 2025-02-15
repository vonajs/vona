import type { Constructable, Type, VonaContext } from 'vona';
import type { z } from 'zod';

export const SymbolDecoratorRule = Symbol('SymbolDecoratorRule');
export const SymbolDecoratorRuleColumn = Symbol('SymbolDecoratorRuleColumn');

export type SchemaLikeCreate = (schema: any) => any; // not use z.ZodSchema
export type SchemaLike = SchemaLikeCreate | z.ZodSchema | Constructable;

export interface ISchemaObjectOptions {
  passthrough?: boolean;
  strict?: boolean;
}

export interface RouteHandlerArgumentMetaDecorator {
  index: number;
  type: RouteHandlerArgumentType;
  field?: string;
  pipes: (Function | z.ZodSchema)[];
  schema: z.ZodSchema;
  extractValue?: TypeExtractValue;
}

export interface RouteHandlerArgumentMeta {
  type: RouteHandlerArgumentType;
  field?: string;
  metaType?: Type<any>;
  controller: Constructable;
  method: string;
  index: number;
}

export type RouteHandlerArgumentType =
  | 'request'
  | 'response'
  | 'body'
  | 'query'
  | 'param'
  | 'headers'
  | 'session'
  | 'file'
  | 'files'
  | 'host'
  | 'ip'
  | 'rawBody'
  | 'string'
  | 'user';

export const SymbolRouteHandlersArgumentsMeta = Symbol('SymbolRouteHandlersArgumentsMeta');
export const SymbolRouteHandlersArgumentsValue = Symbol('SymbolRouteHandlersArgumentsValue');

export type TypeExtractValue = (ctx: VonaContext, argMeta: RouteHandlerArgumentMetaDecorator) => Promise<any>;
