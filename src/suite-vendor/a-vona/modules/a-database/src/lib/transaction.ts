import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.ts';
import { UseMiddleware } from 'vona-module-a-aspect';

export function TransactionMiddleware(options?: Partial<IMiddlewareOptionsTransaction>): ClassDecorator & MethodDecorator {
  return UseMiddleware('a-database:transaction', options);
}
