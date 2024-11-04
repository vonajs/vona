import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFileView } from '../entity/fileView.js';

@Model({ table: 'aViewFile', disableDeleted: false })
export class ModelFileView extends BeanModelBase<EntityFileView> {}
