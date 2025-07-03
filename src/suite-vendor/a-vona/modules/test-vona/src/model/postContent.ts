import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPostContent } from '../entity/postContent.ts';

@Model({ entity: EntityPostContent })
export class ModelPostContent extends BeanModelBase<EntityPostContent> {}
