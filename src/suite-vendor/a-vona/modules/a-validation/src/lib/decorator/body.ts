import { SchemaLike } from '../types/decorator.js';
import { createPipesArgumentDecorator } from './pipesArgument.js';

export function Body(): ParameterDecorator;
export function Body(...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Body(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Body(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('body')(property, ...schemaLikes);
}
