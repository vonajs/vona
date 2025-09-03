import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsOrder extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsOrder>('order')
export class ControllerOrder extends BeanBase {
  @Web.get('findAll')
  async findAll() {
    return this.scope.model.order.select({
      include: {
        products: true,
      },
    });
  }
}
