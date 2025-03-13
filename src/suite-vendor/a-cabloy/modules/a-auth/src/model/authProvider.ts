import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAuthProvider } from '../entity/authProvider.ts';

@Model({ entity: EntityAuthProvider, disableDeleted: true })
export class ModelAuthProvider extends BeanModelBase<EntityAuthProvider> {}
