import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAuthProvider } from '../entity/authProvider.js';

@Model({ table: 'aAuthProvider', options: { disableDeleted: true } })
export class ModelAuthProvider extends BeanModelBase<EntityAuthProvider> {}
