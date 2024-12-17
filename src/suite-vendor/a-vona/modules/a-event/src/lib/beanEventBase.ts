import { BeanBase, composeAsync, Next } from 'vona';
import { IOnionSlice } from 'vona-module-a-onion';
import {
  IDecoratorEventListenerOptions,
  IEventExecute,
  IEventListenerRecord,
  NextEvent,
} from '../types/eventListener.js';

export class BeanEventBase<ARGS extends unknown[] = unknown[], RESULT = unknown> extends BeanBase {
  async emit(args: ARGS, next?: NextEvent<RESULT>): Promise<RESULT> {
    const eventListeners = this.bean.onion.eventListener.getOnionsEnabledWrapped(item => {
      return this._wrapOnion(item);
    }, this.onionName);
    if (eventListeners.length > 0) return await composeAsync(eventListeners)(args, next);
    if (next) return await next();
    return undefined!;
  }

  private _wrapOnion(item: IOnionSlice<IDecoratorEventListenerOptions, keyof IEventListenerRecord>) {
    const fn = (args: ARGS, next: Next) => {
      // execute
      const beanFullName = item.beanOptions.beanFullName;
      const beanInstance = this.app.bean._getBean<IEventExecute>(beanFullName as any);
      if (!beanInstance) {
        throw new Error(`event listener bean not found: ${beanFullName}`);
      }
      return beanInstance.execute(args, next);
    };
    fn._name = item.name;
    return fn;
  }
}
