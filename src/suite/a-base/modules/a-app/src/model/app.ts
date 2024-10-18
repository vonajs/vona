import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityApp } from '../entity/app.js';

@Model({ name: '_app', table: 'aApp', options: { disableDeleted: false } })
export class ModelApp extends BeanModelBase<EntityApp> {}
