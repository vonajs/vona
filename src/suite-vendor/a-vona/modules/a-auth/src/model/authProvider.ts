import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAuthProvider } from '../entity/authProvider.ts';

export interface IModelOptionsAuthProvider extends IDecoratorModelOptions {}

@Model<IModelOptionsAuthProvider>({ entity: EntityAuthProvider, disableDeleted: true })
export class ModelAuthProvider extends BeanModelBase<EntityAuthProvider> {}
