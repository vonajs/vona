import { BeanBase, IMetaOptionsIndex, Meta } from 'vona';
import { EntityInstance } from '../entity/instance.js';
import { tableColumns } from 'vona-module-a-database';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...tableColumns(
      () => EntityInstance,
      entity => entity.name,
    ),
  },
})
export class MetaIndex extends BeanBase {}
