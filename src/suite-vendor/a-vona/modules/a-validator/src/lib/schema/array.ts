import { Constructable, isNil } from 'vona';
import { z } from 'zod';
import { schema } from './schema.js';
import { coerceWithNil } from '@cabloy/zod-query';

export function array<T>(classType: Constructable<T>, params?: z.RawCreateParams & { separator?: string }) {
  return z.preprocess(
    val => {
      val = coerceWithNil(val);
      if (isNil(val)) return val;
      if (typeof val !== 'string') return val;
      if (val[0] === '[') return JSON.parse(val);
      return val.split(',');
    },
    z.array(schema(classType), params),
  );
}
