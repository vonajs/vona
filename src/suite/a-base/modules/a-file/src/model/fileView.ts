import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFileView } from '../entity/fileView.js';

@Model({ entity: EntityFileView, disableDeleted: false })
export class ModelFileView extends BeanModelBase<EntityFileView> {}
