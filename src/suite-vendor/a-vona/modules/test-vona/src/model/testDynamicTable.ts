import type { VonaContext } from 'vona';
import type { IDecoratorModelOptions, ITableRecord } from 'vona-module-a-orm';
import moment from 'moment';
import { BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityTest } from '../entity/test.ts';

export interface IModelOptionsTestDynamicTable extends IDecoratorModelOptions<EntityTest> {}

@Model<IModelOptionsTestDynamicTable>({
  entity: EntityTest,
  table(ctx: VonaContext, defaultTable: keyof ITableRecord) {
    if (ctx.instanceName !== '') return defaultTable;
    return `${defaultTable}_${moment().format('YYYYMMDD')}`;
  },
  softDeletionPrune: {
    handler: async (_ctx, _modelInstance: ModelTestDynamicTable) => {
      // do nothing
    },
  },
})
export class ModelTestDynamicTable extends BeanModelBase<EntityTest> {}
