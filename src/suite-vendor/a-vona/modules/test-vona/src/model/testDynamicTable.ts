import type { BeanModelMeta, ITableRecord } from 'vona-module-a-database';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityTest } from '../entity/test.ts';

@Model({ entity: EntityTest, table(this: BeanModelMeta<EntityTest>, defaultTable: keyof ITableRecord) {
  this.app;
  return defaultTable;
} })
export class ModelTestDynamicTable extends BeanModelBase<EntityTest> {}
