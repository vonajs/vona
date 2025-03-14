import type { TableIdentity } from 'vona-module-a-database';
import { Rule, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { $locale } from '../.metadata/index.ts';

@Dto({ description: $locale('User') })
export class DtoUser {
  @Rule(v.description($locale('UserId')), v.tableIdentity())
  id: TableIdentity;

  @Rule(v.min(3))
  name: string;

  @Rule()
  married: boolean;
}
