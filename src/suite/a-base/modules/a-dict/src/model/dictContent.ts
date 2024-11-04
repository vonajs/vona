import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityDictContent } from '../entity/dictContent.js';

@Model({ table: 'aDictContent', disableDeleted: false })
export class ModelDictContent extends BeanModelBase<EntityDictContent> {}
