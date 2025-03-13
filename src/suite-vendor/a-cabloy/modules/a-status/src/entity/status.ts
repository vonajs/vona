import { Entity, EntityBaseSimple } from 'vona-module-a-database';
import { Rule } from 'vona-module-a-openapi';

@Entity('aStatus')
export class EntityStatus extends EntityBaseSimple {
  @Rule()
  module: string;

  @Rule()
  name: string;

  @Rule()
  value: any;
}
