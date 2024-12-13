import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFile } from '../entity/file.js';

@Model({ entity: EntityFile, disableDeleted: false })
export class ModelFile extends BeanModelBase<EntityFile> {}
