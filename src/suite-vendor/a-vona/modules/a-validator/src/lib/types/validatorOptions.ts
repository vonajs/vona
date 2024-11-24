import { HttpStatus } from 'vona';
import { z } from 'zod';

export interface ValidatorOptions<T = any> {
  passthrough: boolean;
  strict: boolean;
  disableErrorMessages: boolean;
  errorHttpStatusCode: HttpStatus;
  exceptionFactory?: (error: z.ZodError<T>) => any;
}
