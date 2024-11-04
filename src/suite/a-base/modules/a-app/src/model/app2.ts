import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityApp } from '../entity/app.js';

@Model({ table: 'aApp', disableDeleted: false })
export class ModelApp2 extends BeanModelBase<EntityApp> {}
