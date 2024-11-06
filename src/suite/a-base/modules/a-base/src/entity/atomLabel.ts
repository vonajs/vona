import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aAtomLabel')
export class EntityAtomLabel extends EntityItemBase {
  userId: number;
  labels: string;
}
