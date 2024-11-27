import { createBeanDecorator } from '../index.js';

export function Dto(): ClassDecorator {
  return createBeanDecorator('dto');
}
