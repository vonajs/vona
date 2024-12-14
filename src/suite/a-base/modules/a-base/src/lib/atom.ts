import { createBeanDecorator } from 'vona';

export function Atom(): ClassDecorator {
  return createBeanDecorator('atom');
}
