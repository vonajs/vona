import { UseMiddleware } from 'vona-module-a-aspect';
import { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.js';

export function Transaction(options?: Partial<IMiddlewareOptionsTransaction>): ClassDecorator & MethodDecorator {
  return UseMiddleware('a-database:transaction', options);
}
