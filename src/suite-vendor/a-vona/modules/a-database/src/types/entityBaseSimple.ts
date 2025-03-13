import { Rule } from 'vona-module-a-openapi';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBaseSimple extends EntityBaseInner {
  @Rule()
  id: number;
}
