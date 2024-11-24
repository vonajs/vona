import { PipeArgument } from '../types/decorator.js';
import { createPipesArgumentDecorator } from './pipesArgument.js';

export function Body(): ParameterDecorator;
export function Body(...pipes: PipeArgument[]): ParameterDecorator;
export function Body(property: string, ...pipes: PipeArgument[]): ParameterDecorator;
export function Body(property?: string | PipeArgument, ...pipes: PipeArgument[]): ParameterDecorator {
  return createPipesArgumentDecorator('body')(property, ...pipes);
}
