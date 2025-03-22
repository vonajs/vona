import { Api } from 'vona-module-a-openapi';
import { EntityBaseInner } from './entityBaseInner.ts';

export class EntityBaseSimple extends EntityBaseInner {
  @Api.field()
  id: number;
}
