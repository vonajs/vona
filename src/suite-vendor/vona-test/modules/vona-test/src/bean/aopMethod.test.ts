import type { Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsTest extends IDecoratorAopMethodOptions {
  wrapper: string;
}

@AopMethod<IAopMethodOptionsTest>({ wrapper: '' })
export class AopMethodTest extends BeanAopMethodBase implements IAopMethodExecute {
  execute(options: IAopMethodOptionsTest, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    const res = next();
    if (res?.then) {
      return res.then(res => {
        return `${options.wrapper}${res}${options.wrapper}`;
      });
    }
    return `${options.wrapper}${res}${options.wrapper}`;
  }
}
