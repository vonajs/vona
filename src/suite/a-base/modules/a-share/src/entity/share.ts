import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aShare')
export class EntityShare extends EntityItemBase {
  uuid: string;
  userId: number;
  host: string;
  url: string;
}
