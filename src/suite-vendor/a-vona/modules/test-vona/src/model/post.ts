import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';

export interface IModelOptionsPost extends IDecoratorModelOptions {}

@Model<IModelOptionsPost>({ entity: EntityPost })
export class ModelPost extends BeanModelBase<EntityPost> {}
