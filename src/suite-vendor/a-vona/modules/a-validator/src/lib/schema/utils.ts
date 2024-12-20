import { z } from 'zod';
import { errorUtil } from '../zod/errorUtil.js';

export function schemaEmail(message?: errorUtil.ErrMessage) {
  return function (schema: z.ZodString): z.ZodString {
    return schema.email(message);
  };
}

export function schemaMin(min: number, message?: errorUtil.ErrMessage) {
  return function (schema: any): any {
    return schema.min(min, message);
  };
}

export function schemaMax(max: number, message?: errorUtil.ErrMessage) {
  return function (schema: any): any {
    return schema.max(max, message);
  };
}
