import type { IDecoratorBroadcastOptions } from '../types/broadcast.ts';
import { createBeanDecorator } from 'vona';

export function Broadcast(options?: IDecoratorBroadcastOptions): ClassDecorator {
  return createBeanDecorator('broadcast', options);
}
