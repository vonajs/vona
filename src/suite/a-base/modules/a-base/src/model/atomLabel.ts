import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAtomLabel } from '../entity/atomLabel.js';

@Model({ entity: EntityAtomLabel, disableDeleted: true })
export class ModelAtomLabel extends BeanModelBase<EntityAtomLabel> {}
