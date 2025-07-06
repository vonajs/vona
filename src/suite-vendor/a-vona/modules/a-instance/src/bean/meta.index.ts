import type { IMetaOptionsIndex } from 'vona-module-a-index';
import { BeanBase } from 'vona';
import { $tableColumns } from 'vona-module-a-database';
import { Meta } from 'vona-module-a-meta';
import { EntityInstance } from '../entity/instance.ts';

@Meta<IMetaOptionsIndex>({
  indexes: {
    ...$tableColumns(() => EntityInstance, 'name'),
  },
})
export class MetaIndex extends BeanBase {}
