import { cast, Constructable, isClassStrict } from 'vona';
import { schema } from './schema.js';
import { z } from 'zod';
import { SchemaLike, SchemaLikeCreate } from '../types/decorator.js';

export function schemaChains(schemaLikes: SchemaLike[], typeDefault: any): z.ZodSchema {
  // default schema
  let argSchema: z.ZodSchema = schema(typeDefault);
  // loop
  for (let index = schemaLikes.length - 1; index >= 0; index--) {
    const schemaLike = schemaLikes[index];
    if (!schemaLike) continue;
    if (!!cast<z.ZodSchema>(schemaLike).parseAsync) {
      // schema
      argSchema = schemaLike as z.ZodSchema;
    } else if (isClassStrict(schemaLike)) {
      // class
      argSchema = schema(cast<Constructable>(schemaLike));
    } else {
      // function
      argSchema = cast<SchemaLikeCreate>(schemaLike)(argSchema);
    }
  }
  return argSchema;
}
