import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
import type { IMiddlewareOptionsTransaction } from '../bean/middleware.transaction.ts';
import { Aspect } from 'vona-module-a-aspect';

export function TransactionMiddleware(options?: Partial<IMiddlewareOptionsTransaction>): ClassDecorator & MethodDecorator {
  return Aspect.middleware('a-database:transaction', options);
}

export function Transaction(options?: Partial<IAopMethodOptionsTransaction>): MethodDecorator {
  return Aspect.aopMethod('a-database:transaction', options);
}
