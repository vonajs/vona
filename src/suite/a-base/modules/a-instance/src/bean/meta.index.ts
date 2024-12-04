import { BeanBase, IMetaOptionsIndex, Meta } from 'vona';
import { EntityInstance } from '../entity/instance.js';
import { tableColumns } from 'vona-module-a-database';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...tableColumns(EntityInstance, instance => instance.name),
  },
})
export class MetaIndex extends BeanBase {}
