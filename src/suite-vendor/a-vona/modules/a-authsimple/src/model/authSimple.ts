import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityAuthSimple } from '../entity/authSimple.ts';

export interface IModelOptionsAuthSimple extends IDecoratorModelOptions {}

@Model<IModelOptionsAuthSimple>({ entity: EntityAuthSimple, disableDeleted: true })
export class ModelAuthSimple extends BeanModelBase<EntityAuthSimple> {}
