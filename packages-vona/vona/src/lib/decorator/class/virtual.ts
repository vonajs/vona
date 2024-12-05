import { createBeanDecorator } from '../index.js';

export function Virtual(): ClassDecorator {
  return createBeanDecorator('bean', undefined, undefined, true);
}
