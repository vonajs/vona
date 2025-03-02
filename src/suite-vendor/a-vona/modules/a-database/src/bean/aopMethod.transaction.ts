import type { Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TransactionIsolationLevels } from '../types/transaction.ts';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsTransaction extends IDecoratorAopMethodOptions {
  isolationLevel: TransactionIsolationLevels;
  readOnly: boolean;
}

@AopMethod<IAopMethodOptionsTransaction>()
export class AopMethodTransaction extends BeanAopMethodBase implements IAopMethodExecute {
  execute(_options: IAopMethodOptionsTransaction, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    // next
    return next();
  }
}
