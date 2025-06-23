import type { Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsCachingGet extends IDecoratorAopMethodOptions {}

@AopMethod<IAopMethodOptionsCachingGet>()
export class AopMethodCachingGet extends BeanAopMethodBase implements IAopMethodExecute {
  execute(_options: IAopMethodOptionsCachingGet, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    // next
    return next();
  }
}
