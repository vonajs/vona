import type { Next } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCachingActionClearOptions } from '../types/caching.ts';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsCachingClear extends IDecoratorAopMethodOptions, TypeCachingActionClearOptions {}

@AopMethod<IAopMethodOptionsCachingClear>()
export class AopMethodCachingClear extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(_options: IAopMethodOptionsCachingClear, _args: [], next: Next, _receiver: any, _prop: string): Promise<any> {
    // next
    return next();
  }
}
