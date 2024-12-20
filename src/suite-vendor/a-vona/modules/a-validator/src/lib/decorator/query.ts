import { SchemaLike } from '../types/decorator.js';
import { createPipesArgumentDecorator } from './pipesArgument.js';

export function Query(): ParameterDecorator;
export function Query(...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Query(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Query(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('query')(property, ...schemaLikes);
}
