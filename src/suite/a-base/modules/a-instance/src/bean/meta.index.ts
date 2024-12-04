import { BeanBase, IMetaOptionsIndex, Meta } from 'vona';
import { EntityInstance } from '../entity/instance.js';
import { tableColumns } from 'vona-module-a-validator';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...tableColumns(EntityInstance, instance => [instance.name, instance.createdAt]),
  },
})
export class MetaIndex extends BeanBase {}
