import { HttpStatus } from 'vona';
import { z } from 'zod';

export interface ISchemaObjectOptions {
  passthrough?: boolean;
  strict?: boolean;
}

export interface ValidatorOptions<T = any> extends ISchemaObjectOptions {
  disableErrorMessages: boolean;
  errorHttpStatusCode: HttpStatus;
  exceptionFactory?: (error: z.ZodError<T>) => any;
}
