import { Constructable } from 'vona';
import { z } from 'zod';

export type SchemaLikeCreate = (schema: any) => any; // not use z.ZodSchema

export type SchemaLike = SchemaLikeCreate | z.ZodSchema | Constructable;

export interface ISchemaObjectOptions {
  passthrough?: boolean;
  strict?: boolean;
}
