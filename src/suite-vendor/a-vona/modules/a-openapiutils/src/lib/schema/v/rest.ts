import type z from 'zod';
import type { ISchemaOrderParams } from '../../../types/order.ts';
import { OrderLevelBaseMap } from '../../const/database.ts';

export function schemaOrder<T extends z.ZodType>(order: number): T;
export function schemaOrder<T extends z.ZodType>(order: ISchemaOrderParams): T;
export function schemaOrder<T extends z.ZodType>(order: number | ISchemaOrderParams) {
  const order2 = typeof order === 'number' ? { order } : order;
  const levelBase = OrderLevelBaseMap[order2.level ?? 'business'];
  const orderReal = levelBase + order2.order;
  const scene = order2.scene;
  return function (schema: T): T {
    return schema.openapi(
      scene
        ? { rest: { [scene]: { order: orderReal } } }
        : { rest: { order: orderReal } },
    );
  };
}
