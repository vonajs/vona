import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityApp } from '../entity/app.js';

@Model({ entity: EntityApp, disableDeleted: false })
export class ModelApp2 extends BeanModelBase<EntityApp> {}
