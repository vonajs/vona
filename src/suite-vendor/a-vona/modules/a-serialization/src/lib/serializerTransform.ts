import type { IDecoratorSerializerTransformOptions } from '../types/serializerTransform.ts';
import { createBeanDecorator } from 'vona';

export function SerializerTransform<T extends IDecoratorSerializerTransformOptions>(options?: T): ClassDecorator {
  return createBeanDecorator('serializerTransform', options);
}
