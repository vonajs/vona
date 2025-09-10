import type { Constructable } from 'vona';
import type { SchemaLike, SchemaLikeCreate } from 'vona-module-a-openapiutils';
import type { z } from 'zod';
import { isClass } from '@cabloy/utils';
import { cast } from 'vona';
import { $schema } from './schema.ts';

export function makeSchemaLikes<T>(schemaLikes: SchemaLike<T> | SchemaLike<T>[], typeInit: any): z.ZodType<T> {
  if (!Array.isArray(schemaLikes)) schemaLikes = [schemaLikes];
  // default schema
  let argSchema: z.ZodType<T> = $schema(typeInit);
  // loop
  for (let index = schemaLikes.length - 1; index >= 0; index--) {
    const schemaLike = schemaLikes[index];
    argSchema = makeSchemaLike(schemaLike, argSchema);
  }
  return argSchema;
}

export function makeSchemaLike<T>(schemaLike: SchemaLike<T> | undefined, schemaPrevious: z.ZodType<T>): z.ZodType<T> {
  if (!schemaLike) return schemaPrevious;
  if (Object.prototype.hasOwnProperty.call(schemaLike, 'parseAsync')) {
    // schema
    return schemaLike as z.ZodType<T>;
  } else if (
    isClass(schemaLike) ||
    ['String', 'Number', 'Boolean', 'Date', 'BigInt', 'Array'].includes(cast<Function>(schemaLike).name)
  ) {
    // class
    return $schema(cast<Constructable>(schemaLike)) as z.ZodType<T>;
  } else {
    // function
    return cast<SchemaLikeCreate>(schemaLike)(schemaPrevious);
  }
}
