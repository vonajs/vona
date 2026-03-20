import type { TableIdentity } from 'table-identity';
import type { IQueryParams } from 'vona-module-a-orm';

import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

import type { DtoProductCreate } from '../dto/productCreate.ts';
import type { DtoProductQueryRes } from '../dto/productQueryRes.ts';
import type { DtoProductUpdate } from '../dto/productUpdate.ts';
import type { EntityProduct } from '../entity/product.tsx';
import type { ModelProduct } from '../model/product.ts';

@Service()
export class ServiceProduct extends BeanBase {
  async create(product: DtoProductCreate): Promise<EntityProduct> {
    return await this.scope.model.product.insert(product);
  }

  async select(params?: IQueryParams<ModelProduct>): Promise<DtoProductQueryRes> {
    return await this.scope.model.product.selectAndCount({
      ...params,
    });
  }

  async view(id: TableIdentity): Promise<EntityProduct | undefined> {
    return await this.scope.model.product.getById(id);
  }

  async update(id: TableIdentity, product: DtoProductUpdate) {
    return await this.scope.model.product.updateById(id, product);
  }

  async delete(id: TableIdentity) {
    return await this.scope.model.product.deleteById(id);
  }
}
