import { Constructable } from 'vona';
import { z } from 'zod';
import { getSchema } from '../zod/getSchema.js';

export function array<T>(classType: Constructable<T>, params?: z.RawCreateParams) {
  return z.array(getSchema(classType), params);
}
