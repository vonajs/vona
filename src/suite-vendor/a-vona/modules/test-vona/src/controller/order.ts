import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { ModelOrder } from '../model/order.ts';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoOrderQuery } from '../dto/orderQuery.ts';
import { DtoOrderResult } from '../dto/orderResult.ts';

export interface IControllerOptionsOrder extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsOrder>('order')
export class ControllerOrder extends BeanBase {
  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(
    @Arg.queryPro(DtoOrderQuery) params: IQueryParams<ModelOrder>,
  ): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
      ...params,
      include: {
        products: true,
      },
    });
  }
}
