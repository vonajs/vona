import { createBeanDecorator } from 'vona';

export function DatabaseDialect(): ClassDecorator {
  return createBeanDecorator('databaseDialect');
}
