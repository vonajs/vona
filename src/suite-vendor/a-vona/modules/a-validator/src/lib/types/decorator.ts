import { Constructable } from 'vona';
import { z } from 'zod';

export type PipeArgumentCreate = (schema: z.ZodSchema) => z.ZodSchema;

export type PipeArgument = PipeArgumentCreate | z.ZodSchema | Constructable;
