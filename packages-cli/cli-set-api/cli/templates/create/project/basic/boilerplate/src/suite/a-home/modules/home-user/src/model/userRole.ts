import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityUserRole } from '../entity/userRole.ts';

@Model({ entity: EntityUserRole })
export class ModelUserRole extends BeanModelBase<EntityUserRole> {}
