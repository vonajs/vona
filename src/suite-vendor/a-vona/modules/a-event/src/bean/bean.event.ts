import type { IEventRecord } from '../types/event.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanEvent extends BeanBase {
  on<K extends keyof IEventRecord>(
    eventName: K,
    fn: TypeEventHandler<IEventRecord[K]['data'], IEventRecord[K]['result']>,
  ): TypeEventOff {
    const eventHandlers = this.getEventHandlers(eventName);
    eventHandlers.push({ fn });
    return () => {
      const index = eventHandlers.findIndex(item => item.fn === fn);
      if (index > -1) {
        eventHandlers[index].fn = undefined;
        eventHandlers.splice(index, 1);
      }
    };
  }
}
