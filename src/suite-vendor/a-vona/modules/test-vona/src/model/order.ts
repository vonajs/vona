import type { IDecoratorModelOptions } from 'vona-module-a-orm';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityOrder } from '../entity/order.ts';
import { ModelOrderStats } from './orderStats.ts';
import { ModelProduct } from './product.ts';
import { ModelUser } from './user.ts';

export interface IModelOptionsOrder extends IDecoratorModelOptions<EntityOrder> {}

@Model<IModelOptionsOrder>({
  entity: EntityOrder,
  // table: (ctx: VonaContext, defaultTable: keyof ITableRecord) => {
  //   const user = ctx.app.bean.passport.getCurrentUser();
  //   if (!user) return defaultTable;
  //   return `Order_${Number(user.id) % 16}`;
  // },
  relations: {
    user: $relation.belongsTo(() => ModelOrder, () => ModelUser, 'userId', {
      autoload: true,
      columns: ['id', 'name'],
    }),
    products: $relation.hasMany(() => ModelProduct, 'orderId', {
      autoload: true,
      columns: ['id', 'name', 'price', 'quantity', 'amount'],
    }),
  },
  cache: {
    modelsClear: () => ModelOrderStats,
  },
})
export class ModelOrder extends BeanModelBase<EntityOrder> {}
