import { createBeanDecorator } from '../index.js';

export function Virtual(): ClassDecorator {
  return createBeanDecorator('bean' as any, undefined, undefined, true);
}
