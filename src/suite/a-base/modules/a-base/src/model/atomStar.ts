import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAtomStar } from '../entity/atomStar.js';

@Model({ entity: EntityAtomStar, disableDeleted: true })
export class ModelAtomStar extends BeanModelBase<EntityAtomStar> {}
