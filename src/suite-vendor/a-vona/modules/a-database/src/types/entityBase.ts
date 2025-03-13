import { Rule } from 'vona-module-a-openapi';
import { EntityBaseSimple } from './entityBaseSimple.ts';

export class EntityBase extends EntityBaseSimple {
  @Rule()
  id: number;
}
