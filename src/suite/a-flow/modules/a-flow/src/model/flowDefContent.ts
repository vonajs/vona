import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowDefContent } from '../entity/flowDefContent.js';

@Model({ table: 'aFlowDefContent', disableDeleted: false })
export class ModelFlowDefContent extends BeanModelBase<EntityFlowDefContent> {}
