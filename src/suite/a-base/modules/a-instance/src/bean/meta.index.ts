import { BeanBase } from 'vona';
import { EntityInstance } from '../entity/instance.js';
import { tableColumns } from 'vona-module-a-database';
import { IMetaOptionsIndex, Meta } from 'vona-module-a-meta';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...tableColumns(
      () => EntityInstance,
      entity => entity.name,
    ),
  },
})
export class MetaIndex extends BeanBase {}
