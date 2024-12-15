import { createBeanDecorator } from 'vona';
import { IDecoratorBroadcastOptions } from '../types/broadcast.js';

export function Broadcast(options?: IDecoratorBroadcastOptions): ClassDecorator {
  return createBeanDecorator('broadcast', options);
}
