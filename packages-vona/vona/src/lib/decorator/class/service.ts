import { createBeanDecorator } from '../index.js';

export function Service(): ClassDecorator {
  return createBeanDecorator('service');
}
