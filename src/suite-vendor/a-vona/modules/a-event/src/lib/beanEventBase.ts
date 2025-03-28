import type { TypeEventOff } from '../types/event.ts';
import type { NextEventGeneralStrict, NextEventStrict, NextEventSyncStrict } from '../types/eventListener.ts';
import { BeanBase, cast } from 'vona';
import { ServiceEventListener } from '../service/eventListener.ts';

export class BeanEventBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  async emit(data: DATA, nextOrDefault?: NextEventStrict<DATA, RESULT> | RESULT): Promise<RESULT> {
    const beanEventListener = this.bean._getBeanSelector(ServiceEventListener, this.$onionName);
    const next =
      typeof nextOrDefault === 'function'
        ? cast<NextEventStrict<DATA, RESULT>>(nextOrDefault)
        : async (): Promise<RESULT> => {
          return nextOrDefault!;
        };
    return beanEventListener.composer(data, next);
  }

  emitSync(data: DATA, nextOrDefault?: NextEventSyncStrict<DATA, RESULT> | RESULT): RESULT {
    const beanEventListener = this.bean._getBeanSelector(ServiceEventListener, this.$onionName);
    const next =
      typeof nextOrDefault === 'function'
        ? cast<NextEventSyncStrict<DATA, RESULT>>(nextOrDefault)
        : (): RESULT => {
            return nextOrDefault!;
          };
    return beanEventListener.composer(data, next);
  }

  on(fn: NextEventGeneralStrict<DATA, RESULT>): TypeEventOff {
    const beanEventListener = this.bean._getBeanSelector(ServiceEventListener, this.$onionName);
    return beanEventListener.on(fn);
  }
}
