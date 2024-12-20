import { Constructable } from 'vona';
import { z } from 'zod';

export type SchemaLikeCreate = (schema: z.ZodSchema) => z.ZodSchema;

export type SchemaLike = SchemaLikeCreate | z.ZodSchema | Constructable;
