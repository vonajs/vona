import { createPipesRouteParamDecorator } from './routeParams.js';
import { PipeArgument } from '../types/decorator.js';

export function Query(): ParameterDecorator;
export function Query(...pipes: PipeArgument[]): ParameterDecorator;
export function Query(property: string, ...pipes: PipeArgument[]): ParameterDecorator;
export function Query(property?: string | PipeArgument, ...pipes: PipeArgument[]): ParameterDecorator {
  return createPipesRouteParamDecorator('query')(property, ...pipes);
}
