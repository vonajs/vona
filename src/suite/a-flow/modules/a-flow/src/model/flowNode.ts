import { Model } from '@cabloy/core';
import { BeanModelBase } from 'cabloy-module-api-a-database';
import { EntityFlowNode } from '../entity/flowNode.js';

@Model({
  table: 'aFlowNode',
  options: {
    disableDeleted: true,
  },
})
export class ModelFlowNode extends BeanModelBase<EntityFlowNode> {}
