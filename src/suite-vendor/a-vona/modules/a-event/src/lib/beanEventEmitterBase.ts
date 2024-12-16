import { BeanBase, composeAsync, Next } from 'vona';
import { IOnionSlice } from 'vona-module-a-onion';
import { IDecoratorEventListenerOptions, IEventExecute, IEventListenerRecord } from '../types/eventListener.js';

const SymbolListeners = Symbol('SymbolListeners');

export class BeanEventEmitterBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  private [SymbolListeners]: Record<string, Function[]> = {};

  async emit(data: DATA, next?: Next): Promise<RESULT> {
    const eventListeners = this._getEventListeners(this.onionName);
    return await composeAsync(eventListeners)(data, next);
  }

  private _getEventListeners(selector: string) {
    if (!this[SymbolListeners][selector]) {
      const onions = this.bean.onion.eventListener.getOnionsEnabled(selector);
      this[SymbolListeners][selector] = onions.map(item => {
        return this._wrapOnion(item);
      });
    }
    return this[SymbolListeners][selector];
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
