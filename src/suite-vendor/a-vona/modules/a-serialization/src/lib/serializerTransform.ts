import type { IDecoratorSerializerOptions } from '../types/serializer.ts';
import { createBeanDecorator } from 'vona';

export function SerializerTransform<T extends IDecoratorSerializerOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('serializerTransform', options);
}
