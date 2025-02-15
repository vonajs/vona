import { Entity, EntityBase } from 'vona-module-a-database';
import { Rule } from 'vona-module-a-openapi';

@Entity('aStatus')
export class EntityStatus extends EntityBase {
  @Rule()
  module: string;

  @Rule()
  name: string;

  @Rule()
  value: string;
}
