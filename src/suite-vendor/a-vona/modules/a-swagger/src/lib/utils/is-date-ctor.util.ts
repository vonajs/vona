import { Type } from 'vona';

export function isDateCtor(type: Type<unknown> | Function | string): boolean {
  return type === Date;
}
