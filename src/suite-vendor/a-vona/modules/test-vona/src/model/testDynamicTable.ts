import type { VonaContext } from 'vona';
import type { IDecoratorModelOptions, ITableRecord } from 'vona-module-a-database';
import moment from 'moment';
import { BeanModelBase, Model } from 'vona-module-a-database';
import { EntityTest } from '../entity/test.ts';

export interface IModelOptionsTestDynamicTable extends IDecoratorModelOptions {}

@Model<IModelOptionsTestDynamicTable>({ entity: EntityTest, table(ctx: VonaContext, defaultTable: keyof ITableRecord) {
  if (ctx.instanceName !== '') return defaultTable;
  return `${defaultTable}_${moment().format('YYYYMMDD')}`;
} })
export class ModelTestDynamicTable extends BeanModelBase<EntityTest> {}
