import type { Next } from 'vona';
import type { IOnionSlice } from 'vona-module-a-onion';
import type { IEventRecord } from '../types/event.ts';
import type { IDecoratorEventListenerOptions, IEventExecute, IEventListenerRecord } from '../types/eventListener.ts';
import { BeanBase, compose } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceEventListener extends BeanBase {
  private _eventName: keyof IEventRecord;
  private _composer: Function;

  protected __init__(eventName: keyof IEventRecord) {
    this._eventName = eventName;
  }

  get composer() {
    if (!this._composer) {
      const eventListeners = this.bean.onion.eventListener.getOnionsEnabledWrapped(item => {
        return this._wrapOnion(item);
      }, this._eventName);
      this._composer = compose(eventListeners);
    }
    return this._composer;
  }

  private _wrapOnion(item: IOnionSlice<IDecoratorEventListenerOptions, keyof IEventListenerRecord>) {
    const fn = (data: unknown, next: Next) => {
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
