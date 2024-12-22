import { HttpStatus } from 'vona';
import { ISchemaObjectOptions } from 'vona-module-a-openapi';
import { z } from 'zod';

export interface ValidatorOptions<T = any> extends ISchemaObjectOptions {
  disableErrorMessages: boolean;
  errorHttpStatusCode: HttpStatus;
  exceptionFactory?: (error: z.ZodError<T>) => any;
}
