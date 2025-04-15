import type { TableIdentity } from 'vona-module-a-database';
import type { IAuthBase } from 'vona-module-a-user';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoAuth implements IAuthBase {
  @Api.field(v.tableIdentity())
  id: TableIdentity;
}
