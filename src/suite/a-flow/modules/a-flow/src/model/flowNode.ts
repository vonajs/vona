import { Model } from 'vona';
import { BeanModelBase } from 'vona-module-a-database';
import { EntityFlowNode } from '../entity/flowNode.js';

@Model({
  table: 'aFlowNode',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlowNode extends BeanModelBase<EntityFlowNode> {}
