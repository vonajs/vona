import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.js';
import { UseMiddleware } from 'vona-module-a-aspect';

export function Transaction(options?: Partial<IMiddlewareOptionsTransaction>): ClassDecorator & MethodDecorator {
  return UseMiddleware('a-database:transaction', options);
}
