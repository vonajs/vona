import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

@Entity('aStatus')
export class EntityStatus extends EntityBaseSimple {
  @Api.field()
  module: string;

  @Api.field()
  name: string;

  @Api.field()
  value: any;
}
