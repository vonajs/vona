import { Type } from '@nestjs/common';
import { Constructable } from 'vona';

export function isDateCtor(type: Type<unknown> | Constructable | string): boolean {
  return type === Date;
}
