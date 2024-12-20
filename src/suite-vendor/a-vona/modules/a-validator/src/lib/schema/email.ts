import { z } from 'zod';
import { errorUtil } from '../zod/errorUtil.js';

export function schemaEmail(message?: errorUtil.ErrMessage) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.email(message);
  };
}
