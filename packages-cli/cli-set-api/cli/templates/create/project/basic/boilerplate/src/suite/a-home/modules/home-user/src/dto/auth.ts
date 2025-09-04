import type { TableIdentity } from 'table-identity';
import type { IAuthBase } from 'vona-module-a-user';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsAuth extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsAuth>()
export class DtoAuth implements IAuthBase {
  @Api.field(v.tableIdentity())
  id: TableIdentity;
}
