import type { TableIdentity } from 'table-identity';
import type { IQueryParams } from 'vona-module-a-orm';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { ModelProduct } from '../model/product.ts';
import { BeanBase } from 'vona';
import { Api, Resource, v } from 'vona-module-a-openapiutils';
import { Ssr } from 'vona-module-a-ssr';
import { Passport } from 'vona-module-a-user';
import { Arg, Controller, Web } from 'vona-module-a-web';
import { DtoProductCreate } from '../dto/productCreate.ts';
import { DtoProductQuery } from '../dto/productQuery.ts';
import { DtoProductQueryRes } from '../dto/productQueryRes.ts';
import { DtoProductUpdate } from '../dto/productUpdate.ts';
import { DtoProductView } from '../dto/productView.ts';

export interface IControllerOptionsProduct extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsProduct>('product')
@Resource()
export class ControllerProduct extends BeanBase {
  @Web.post()
  @Api.body(v.tableIdentity())
  @Passport.roleName({ name: 'admin' })
  async create(@Arg.body() product: DtoProductCreate): Promise<TableIdentity> {
    return (await this.scope.service.product.create(product)).id;
  }

  @Web.get()
  @Api.body(DtoProductQueryRes)
  @Ssr.redirect('a-ssrhome:home', '/rest/resource/:resource', { params: { resource: 'start-test:product' } })
  async select(@Arg.filter(DtoProductQuery) params: IQueryParams<ModelProduct>): Promise<DtoProductQueryRes> {
    return await this.scope.service.product.select(params);
  }

  @Web.get(':id')
  @Api.body(v.optional(), v.object(DtoProductView))
  async view(@Arg.param('id', v.tableIdentity()) id: TableIdentity): Promise<DtoProductView | undefined> {
    return await this.scope.service.product.view(id);
  }

  @Web.patch(':id')
  async update(@Arg.param('id', v.tableIdentity()) id: TableIdentity, @Arg.body() product: DtoProductUpdate) {
    return await this.scope.service.product.update(id, product);
  }

  @Web.delete(':id')
  async delete(@Arg.param('id', v.tableIdentity()) id: TableIdentity) {
    return await this.scope.service.product.delete(id);
  }
}
