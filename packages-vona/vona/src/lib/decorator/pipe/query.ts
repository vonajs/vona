import { createPipesRouteParamDecorator } from './routeParams.js';

export function Query(): ParameterDecorator;
export function Query(...pipes: Function[]): ParameterDecorator;
export function Query(property: string, ...pipes: Function[]): ParameterDecorator;
export function Query(property?: string | Function, ...pipes: Function[]): ParameterDecorator {
  return createPipesRouteParamDecorator('query')(property, ...pipes);
}
