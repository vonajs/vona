import type { SchemaLike } from '../../types/decorator.js';
import { createPipesArgumentDecorator } from './pipesArgument.js';

export function Param(): ParameterDecorator;
export function Param(...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Param(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Param(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('param')(property, ...schemaLikes);
}

export function Query(): ParameterDecorator;
export function Query(...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Query(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Query(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('query')(property, ...schemaLikes);
}

export function Body(): ParameterDecorator;
export function Body(...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Body(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Body(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('body')(property, ...schemaLikes);
}

export function Headers(): ParameterDecorator;
export function Headers(...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Headers(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
export function Headers(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('headers')(property, ...schemaLikes);
}

export function User(...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('user')(undefined, ...schemaLikes);
}
