import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';
import { ModelPostContent } from './postContent.ts';

export interface IModelOptionsPost extends IDecoratorModelOptions<'postContent'> {}

@Model<IModelOptionsPost>({
  entity: EntityPost,
  relations: {
    postContent: { type: 'hasOne', model: () => ModelPostContent, key: 'postId' },
  },
})
export class ModelPost extends BeanModelBase<EntityPost> {}
