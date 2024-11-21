import { Constructable, CreateArgumentPipeInfoFn } from 'vona';
import { z } from 'zod';

export type PipeRouteParam = CreateArgumentPipeInfoFn<any> | z.ZodSchema | Constructable;
