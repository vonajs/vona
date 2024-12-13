import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aAtomLabel')
export class EntityAtomLabel extends EntityItemBase {
  userId: number;
  labels: string;
}
