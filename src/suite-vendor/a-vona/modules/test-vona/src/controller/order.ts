import type { TableIdentity } from 'table-identity';
import type { VonaContext } from 'vona';
import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions, IPipeOptionsQueryTransformInfo } from 'vona-module-a-web';
import type { ModelOrder } from '../model/order.ts';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoOrderCreate } from '../dto/orderCreate.ts';
import { DtoOrderQuery } from '../dto/orderQuery.ts';
import { DtoOrderQueryPage } from '../dto/orderQueryPage.ts';
import { DtoOrderResult } from '../dto/orderResult.ts';
import { DtoOrderResultPage } from '../dto/orderResultPage.ts';
import { DtoOrderUpdate } from '../dto/orderUpdate.ts';

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
  async create(@Arg.body() data: DtoOrderCreate) {
    return await this.scope.model.order.insert(data);
  }

  @Web.post('update/:id')
  async update(@Arg.param('id') id: TableIdentity, @Arg.body() data: DtoOrderUpdate) {
    return await this.scope.model.order.update({
      ...data,
      id,
    });
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

  @Web.get('findMany')
  @Api.body(DtoOrderResultPage)
  async findMany(
    @Arg.queryPro(DtoOrderQueryPage) params: IQueryParams<ModelOrder>,
  ) {
    return this.scope.model.order.selectAndCount({
      ...params,
      include: {
        products: true,
      },
    });
  }
}
