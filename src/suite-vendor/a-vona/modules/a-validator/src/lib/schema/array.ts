import { Constructable } from 'vona';
import { z } from 'zod';
import { schema } from './schema.js';

export function array<T>(classType: Constructable<T>, params?: z.RawCreateParams) {
  return z.array(schema(classType), params);
}
