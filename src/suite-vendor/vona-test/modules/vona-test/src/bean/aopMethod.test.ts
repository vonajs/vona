import type { Next, NextSync } from 'vona';
import type { IAopMethodExecute, IAopMethodGet, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsTest extends IDecoratorAopMethodOptions {
  wrapper: string;
}

@AopMethod<IAopMethodOptionsTest>({ wrapper: '' })
export class AopMethodTest extends BeanAopMethodBase implements IAopMethodGet, IAopMethodExecute {
  get(options: IAopMethodOptionsTest, next: NextSync, _receiver: any, _prop: string): any {
    const res = next();
    return this._wrapper(options.wrapper, res);
  }

  execute(options: IAopMethodOptionsTest, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    const res = next();
    if (res?.then) {
      return res.then(res => {
        return this._wrapper(options.wrapper, res);
      });
    }
    return this._wrapper(options.wrapper, res);
  }

  _wrapper(wrapper, data) {
    return `${wrapper}${data}${wrapper}`;
  }
}
