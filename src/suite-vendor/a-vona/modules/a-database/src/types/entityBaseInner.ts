import { Api } from 'vona-module-a-openapi';
import { EntityBaseEmpty } from './entityBaseEmpty.ts';

export class EntityBaseInner extends EntityBaseEmpty {
  @Api.field()
  createdAt: Date;

  @Api.field()
  updatedAt: Date;

  @Api.field()
  deleted: boolean;

  @Api.field()
  iid: number;
}
