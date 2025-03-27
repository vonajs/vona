import type { Next } from 'vona';
import type { IOnionSlice } from 'vona-module-a-onion';
import type {
  IDecoratorEventListenerOptions,
  IEventExecute,
  IEventListenerRecord,
  NextEventStrict,
  NextEventSyncStrict,
} from '../types/eventListener.ts';
import { BeanBase, cast, compose } from 'vona';

export class BeanEventBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  async emit(data: DATA, nextOrDefault?: NextEventStrict<DATA, RESULT> | RESULT): Promise<RESULT> {
    const eventListeners = this.bean.onion.eventListener.getOnionsEnabledWrapped(item => {
      return this._wrapOnion(item);
    }, this.$onionName);
    if (eventListeners.length === 0) {
      return typeof nextOrDefault === 'function'
        ? await cast<NextEventStrict<DATA, RESULT>>(nextOrDefault)(data)
        : nextOrDefault!;
    }
    const next =
      typeof nextOrDefault === 'function'
        ? cast<NextEventStrict<DATA, RESULT>>(nextOrDefault)
        : async (): Promise<RESULT> => {
          return nextOrDefault!;
        };
    return await compose(eventListeners)(data, next);
  }

  emitSync(data: DATA, nextOrDefault?: NextEventSyncStrict<DATA, RESULT> | RESULT): RESULT {
    const eventListeners = this.bean.onion.eventListener.getOnionsEnabledWrapped(item => {
      return this._wrapOnion(item);
    }, this.$onionName);
    if (eventListeners.length === 0) {
      return typeof nextOrDefault === 'function'
        ? cast<NextEventSyncStrict<DATA, RESULT>>(nextOrDefault)(data)
        : nextOrDefault!;
    }
    const next =
      typeof nextOrDefault === 'function'
        ? cast<NextEventSyncStrict<DATA, RESULT>>(nextOrDefault)
        : (): RESULT => {
            return nextOrDefault!;
          };
    return compose(eventListeners)(data, next);
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
