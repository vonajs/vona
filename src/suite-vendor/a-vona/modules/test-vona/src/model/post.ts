import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';

@Model({ entity: EntityPost })
export class ModelPost extends BeanModelBase<EntityPost> {}
