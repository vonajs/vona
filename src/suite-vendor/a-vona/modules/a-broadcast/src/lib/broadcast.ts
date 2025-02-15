import type { IDecoratorBroadcastOptions } from '../types/broadcast.js';
import { createBeanDecorator } from 'vona';

export function Broadcast(options?: IDecoratorBroadcastOptions): ClassDecorator {
  return createBeanDecorator('broadcast', options);
}
