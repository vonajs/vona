import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityAuth } from '../entity/auth.ts';

export interface IModelOptionsAuth extends IDecoratorModelOptions {}

@Model<IModelOptionsAuth>({ entity: EntityAuth, disableDeleted: true })
export class ModelAuth extends BeanModelBase<EntityAuth> {}
