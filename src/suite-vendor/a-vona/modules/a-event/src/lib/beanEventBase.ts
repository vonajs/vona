import { BeanBase, composeAsync, Next } from 'vona';
import { IOnionSlice } from 'vona-module-a-onion';
import {
  IDecoratorEventListenerOptions,
  IEventExecute,
  IEventListenerRecord,
  NextEvent,
} from '../types/eventListener.js';

export class BeanEventBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  async emit(data: DATA, nextOrDefault?: NextEvent<RESULT> | RESULT): Promise<RESULT> {
    const next =
      typeof nextOrDefault === 'function'
        ? (nextOrDefault as NextEvent<RESULT>)
        : async (): Promise<RESULT> => {
            return nextOrDefault!;
          };
    const eventListeners = this.bean.onion.eventListener.getOnionsEnabledWrapped(item => {
      return this._wrapOnion(item);
    }, this.onionName);
    if (eventListeners.length === 0) return await next();
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
