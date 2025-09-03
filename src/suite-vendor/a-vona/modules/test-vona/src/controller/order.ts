import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Api, v } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';
import { DtoOrderResult } from '../dto/orderResult.ts';

export interface IControllerOptionsOrder extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsOrder>('order')
export class ControllerOrder extends BeanBase {
  @Web.get('findAll')
  @Api.body(v.array(DtoOrderResult))
  async findAll(): Promise<DtoOrderResult[]> {
    return this.scope.model.order.select({
      include: {
        products: true,
      },
    });
  }
}
