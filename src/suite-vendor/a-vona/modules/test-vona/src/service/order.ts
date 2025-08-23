import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceOrder extends BeanBase {
  async relationHasMany() {
    // insert
    const orderCreate = await this.scope.model.order.insert(
      {
        orderNo: 'Order001',
        products: [
          { name: 'Apple' },
          { name: 'Pear' },
        ],
      },
      {
        include: {
          products: true,
        },
      },
    );
    // get
    await this.scope.model.order.get(
      {
        id: orderCreate.id,
      },
      {
        include: {
          products: true,
        },
      },
    );
    // update
    await this.scope.model.order.update(
      {
        id: orderCreate.id,
        orderNo: 'Order001-Update',
        products: [
          // create product: Peach
          { name: 'Peach' },
          // update product: Apple
          { id: orderCreate.products?.[0].id, name: 'Apple-Update' },
          // delete product: Pear
          { id: orderCreate.products?.[1].id, deleted: true },
        ],
      },
      {
        include: {
          products: true,
        },
      },
    );
    // delete
    await this.scope.model.order.delete(
      {
        id: orderCreate.id,
      },
      {
        include: {
          products: true,
        },
      },
    );
  }
}
