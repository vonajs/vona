import type { Constructable } from 'vona';
import type { z } from 'zod';
import type { SchemaLike, SchemaLikeCreate } from '../../types/decorator.ts';
import { cast, isClassStrict } from 'vona';
import { $schema } from './schema.ts';

export function makeSchemaLikes(schemaLikes: SchemaLike[], typeInit: any): z.ZodSchema {
  // default schema
  let argSchema: z.ZodSchema = $schema(typeInit);
  // loop
  for (let index = schemaLikes.length - 1; index >= 0; index--) {
    const schemaLike = schemaLikes[index];
    argSchema = makeSchemaLike(schemaLike, argSchema);
  }
  return argSchema;
}

export function makeSchemaLike(schemaLike: SchemaLike | undefined, schemaPrevious: z.ZodSchema): z.ZodSchema {
  if (!schemaLike) return schemaPrevious;
  if (Object.prototype.hasOwnProperty.call(schemaLike, 'parseAsync')) {
    // schema
    return schemaLike as z.ZodSchema;
  } else if (
    isClassStrict(schemaLike) ||
    ['String', 'Number', 'Boolean', 'Date', 'BigInt', 'Array'].includes(cast<Function>(schemaLike).name)
  ) {
    // class
    return $schema(cast<Constructable>(schemaLike));
  } else {
    // function
    return cast<SchemaLikeCreate>(schemaLike)(schemaPrevious);
  }
}
