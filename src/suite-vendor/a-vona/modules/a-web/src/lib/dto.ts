import { createBeanDecorator } from 'vona';

export function Dto(): ClassDecorator {
  return createBeanDecorator('dto');
}
