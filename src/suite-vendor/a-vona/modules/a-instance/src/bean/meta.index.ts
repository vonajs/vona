import type { IMetaOptionsIndex } from 'vona-module-a-index';
import { BeanBase } from 'vona';
import { tableColumns } from 'vona-module-a-database';
import { Meta } from 'vona-module-a-meta';
import { EntityInstance } from '../entity/instance.js';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...tableColumns(
      () => EntityInstance,
      entity => entity.name,
    ),
  },
})
export class MetaIndex extends BeanBase {}
