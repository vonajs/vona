import { BeanBase, composeAsync, Next } from 'vona';
import { IOnionSlice } from 'vona-module-a-onion';
import { IDecoratorEventListenerOptions, IEventExecute, IEventListenerRecord } from '../types/eventListener.js';

export class BeanEventEmitterBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  async emit(data: DATA, next?: (data: DATA) => Promise<RESULT>): Promise<RESULT> {
    const eventListeners = this.bean.onion.eventListener.getOnionsEnabledWrapped(item => {
      return this._wrapOnion(item);
    }, this.onionName);
    return await composeAsync(eventListeners)(data, next);
  }

  private _wrapOnion(item: IOnionSlice<IDecoratorEventListenerOptions, keyof IEventListenerRecord>) {
    const fn = (data: DATA, next: Next) => {
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean<IEventExecute>(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`event listener bean not found: ${beanFullName}`);
      }
      return beanInstance.execute(data, next);
    };
    fn._name = item.name;
    return fn;
  }
}
