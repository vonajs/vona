import { isClassStrict } from 'vona';
import { schema } from './schema.js';
import { z } from 'zod';

export function schemaChains(schemaLikes: any[], typeDefault: any): z.ZodSchema {
  // default schema
  let argSchema = schema(typeDefault);
  // loop
  for (let index = schemaLikes.length - 1; index >= 0; index--) {
    const schemaLike = schemaLikes[index];
    if (!schemaLike) continue;
    if (schemaLike.parseAsync) {
      // schema
      argSchema = schemaLike;
    } else if (isClassStrict(schemaLike)) {
      // class
      argSchema = schema(schemaLike);
    } else {
      // function
      argSchema = schemaLike(argSchema);
    }
  }
  return argSchema;
}
