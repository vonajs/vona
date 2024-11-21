import { createPipesRouteParamDecorator } from './routeParams.js';
import { PipeRouteParam } from '../types/decorator.js';

export function Query(): ParameterDecorator;
export function Query(...pipes: PipeRouteParam[]): ParameterDecorator;
export function Query(property: string, ...pipes: PipeRouteParam[]): ParameterDecorator;
export function Query(property?: string | PipeRouteParam, ...pipes: PipeRouteParam[]): ParameterDecorator {
  return createPipesRouteParamDecorator('query')(property, ...pipes);
}
