import type { SchemaLike } from '../../types/decorator.ts';
import { createPipesArgumentDecorator } from './pipesArgument.ts';

function Param(): ParameterDecorator;
function Param(...schemaLikes: SchemaLike[]): ParameterDecorator;
function Param(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
function Param(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('param')(property, ...schemaLikes);
}

function Query(): ParameterDecorator;
function Query(...schemaLikes: SchemaLike[]): ParameterDecorator;
function Query(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
function Query(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('query')(property, ...schemaLikes);
}

function Body(): ParameterDecorator;
function Body(...schemaLikes: SchemaLike[]): ParameterDecorator;
function Body(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
function Body(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('body')(property, ...schemaLikes);
}

function Headers(): ParameterDecorator;
function Headers(...schemaLikes: SchemaLike[]): ParameterDecorator;
function Headers(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
function Headers(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('headers')(property, ...schemaLikes);
}

function Fields(): ParameterDecorator;
function Fields(...schemaLikes: SchemaLike[]): ParameterDecorator;
function Fields(property: string, ...schemaLikes: SchemaLike[]): ParameterDecorator;
function Fields(property?: string | SchemaLike, ...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('fields')(property, ...schemaLikes);
}

function User(...schemaLikes: SchemaLike[]): ParameterDecorator {
  return createPipesArgumentDecorator('user')(undefined, ...schemaLikes);
}

export const Arg = {
  param: Param,
  query: Query,
  body: Body,
  headers: Headers,
  fields: Fields,
  user: User,
};
