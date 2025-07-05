import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPostContent } from '../entity/postContent.ts';

export interface IModelOptionsPostContent extends IDecoratorModelOptions {}

@Model<IModelOptionsPostContent>({ entity: EntityPostContent })
export class ModelPostContent extends BeanModelBase<EntityPostContent> {}
