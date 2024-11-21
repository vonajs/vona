import { Constructable, CreateArgumentPipeInfoFn } from 'vona';
import { z } from 'zod';

export type PipeArgument = CreateArgumentPipeInfoFn<any> | z.ZodSchema | Constructable;
