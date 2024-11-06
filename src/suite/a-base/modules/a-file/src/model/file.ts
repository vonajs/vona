import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFile } from '../entity/file.js';

@Model({ entity: EntityFile, disableDeleted: false })
export class ModelFile extends BeanModelBase<EntityFile> {}
