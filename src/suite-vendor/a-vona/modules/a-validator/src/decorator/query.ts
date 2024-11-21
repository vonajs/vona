import { Constructable } from 'vona';
import { z } from 'zod';
import { createPipesRouteParamDecorator } from './routeParams.js';

//z.ZodSchema | Constructable

export function Query(): ParameterDecorator;
export function Query(...pipes: Function[]): ParameterDecorator;
export function Query(property: string, ...pipes: Function[]): ParameterDecorator;
export function Query(property?: string | Function, ...pipes: Function[]): ParameterDecorator {
  return createPipesRouteParamDecorator('query')(property, ...pipes);
}
