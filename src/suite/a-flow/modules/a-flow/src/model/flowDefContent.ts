import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowDefContent } from '../entity/flowDefContent.js';

@Model({ entity: EntityFlowDefContent, disableDeleted: false })
export class ModelFlowDefContent extends BeanModelBase<EntityFlowDefContent> {}
