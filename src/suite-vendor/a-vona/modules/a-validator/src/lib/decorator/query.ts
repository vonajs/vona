import { PipeArgument } from '../../types/decorator.js';
import { createPipesArgumentDecorator } from './pipesArgument.js';

export function Query(): ParameterDecorator;
export function Query(...pipes: PipeArgument[]): ParameterDecorator;
export function Query(property: string, ...pipes: PipeArgument[]): ParameterDecorator;
export function Query(property?: string | PipeArgument, ...pipes: PipeArgument[]): ParameterDecorator {
  return createPipesArgumentDecorator('query')(property, ...pipes);
}
