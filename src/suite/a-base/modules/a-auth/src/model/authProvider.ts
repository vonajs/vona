import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityAuthProvider } from '../entity/authProvider.js';

@Model({ entity: EntityAuthProvider, disableDeleted: true })
export class ModelAuthProvider extends BeanModelBase<EntityAuthProvider> {}
