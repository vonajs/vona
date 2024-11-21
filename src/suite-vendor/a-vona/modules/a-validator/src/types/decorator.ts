import { Constructable } from 'vona';
import { z } from 'zod';

export type PipeRouteParam = Function | z.ZodSchema | Constructable;
