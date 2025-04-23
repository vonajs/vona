import { Entity, EntityBase } from 'vona-module-a-database';
import { Api } from 'vona-module-a-openapi';

@Entity('testVona')
export class EntityTest extends EntityBase {
  @Api.field()
  title: string;

  @Api.field()
  description: string;
}
