import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aAtomLabelRef')
export class EntityAtomLabelRef extends EntityItemBase {
  userId: number;
  labelId: number;
}
