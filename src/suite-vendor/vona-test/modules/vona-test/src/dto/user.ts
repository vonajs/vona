import type { TableIdentity } from 'vona-module-a-database';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { $locale } from '../.metadata/index.ts';

@Dto({ description: $locale('User') })
export class DtoUser {
  @Api.field(v.description($locale('UserId')), v.tableIdentity())
  id: TableIdentity;

  @Api.field(v.min(3))
  name: string;

  @Api.field()
  married: boolean;
}
