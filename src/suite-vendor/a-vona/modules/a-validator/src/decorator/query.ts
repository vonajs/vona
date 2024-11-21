import { Constructable } from 'vona';
import { z } from 'zod';
import { createSchemaRouteParamDecorator } from './routeParams.js';

export function Query(): ParameterDecorator;
export function Query(schema: z.ZodSchema | Constructable): ParameterDecorator;
export function Query(property: string, schema?: z.ZodSchema | Constructable): ParameterDecorator;
export function Query(
  property?: string | z.ZodSchema | Constructable,
  schema?: z.ZodSchema | Constructable,
): ParameterDecorator {
  return createSchemaRouteParamDecorator('query')(property, schema);
}
