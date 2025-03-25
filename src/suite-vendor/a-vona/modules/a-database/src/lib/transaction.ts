import type { IAopMethodOptionsTransaction } from '../bean/aopMethod.transaction.ts';
import { Aspect } from 'vona-module-a-aspect';

export function Transaction(options?: Partial<IAopMethodOptionsTransaction>): MethodDecorator {
  return Aspect.aopMethod('a-database:transaction', options);
}
