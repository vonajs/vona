import type { VonaContext } from 'vona';
import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions, IPipeOptionsQueryTransformInfo } from 'vona-module-a-web';
import type { ModelOrder } from '../model/order.ts';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoOrderCreate } from '../dto/orderCreate.ts';
import { DtoOrderQuery } from '../dto/orderQuery.ts';
import { DtoOrderResult } from '../dto/orderResult.ts';

export interface IControllerOptionsOrder extends IDecoratorControllerOptions {}

function myCustomQueryTransform(_ctx: VonaContext, info: IPipeOptionsQueryTransformInfo): boolean | undefined {
  if (info.key === 'userName') {
    info.params.where[info.fullName] = info.value;
    return true;
  }
  return undefined;
}

@Controller<IControllerOptionsOrder>('order')
export class ControllerOrder extends BeanBase {
  @Web.post('create')
  @Api.body(DtoOrderResult)
  async create(@Arg.body(DtoOrderCreate) data: DtoOrderCreate) {
    return await this.scope.model.order.insert(data);
  }

  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(
    @Arg.queryPro(DtoOrderQuery, myCustomQueryTransform) params: IQueryParams<ModelOrder>,
  ): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
      ...params,
      include: {
        products: true,
      },
    });
  }
}
