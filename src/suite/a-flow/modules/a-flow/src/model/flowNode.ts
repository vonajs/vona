import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityFlowNode } from '../entity/flowNode.js';

@Model({ entity: EntityFlowNode, disableDeleted: true })
export class ModelFlowNode extends BeanModelBase<EntityFlowNode> {}
