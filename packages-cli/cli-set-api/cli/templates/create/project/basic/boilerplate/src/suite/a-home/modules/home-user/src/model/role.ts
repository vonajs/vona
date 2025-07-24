import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityRole } from '../entity/role.ts';

@Model({ entity: EntityRole })
export class ModelRole extends BeanModelBase<EntityRole> {}
