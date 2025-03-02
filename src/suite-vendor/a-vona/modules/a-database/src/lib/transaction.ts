import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.ts';
import { UseAopMethod, UseMiddleware } from 'vona-module-a-aspect';

export function TransactionMiddleware(options?: Partial<IMiddlewareOptionsTransaction>): ClassDecorator & MethodDecorator {
  return UseMiddleware('a-database:transaction', options);
}

export function Transaction(options?: Partial<IMiddlewareOptionsTransaction>): MethodDecorator {
  return UseAopMethod('a-database:transaction', options);
}
