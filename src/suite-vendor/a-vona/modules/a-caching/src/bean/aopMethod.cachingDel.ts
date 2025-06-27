import type { Next } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type { TypeCachingActionOptions } from '../types/caching.ts';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsCachingDel extends IDecoratorAopMethodOptions, TypeCachingActionOptions {}

@AopMethod<IAopMethodOptionsCachingDel>()
export class AopMethodCachingDel extends BeanAopMethodBase implements IAopMethodExecute {
  async execute(_options: IAopMethodOptionsCachingDel, _args: [], next: Next, _receiver: any, _prop: string): Promise<any> {
    // next
    return next();
  }
}
