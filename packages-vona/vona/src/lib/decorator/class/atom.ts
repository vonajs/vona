import { createBeanDecorator } from '../index.js';

export function Atom(): ClassDecorator {
  return createBeanDecorator('atom');
}
