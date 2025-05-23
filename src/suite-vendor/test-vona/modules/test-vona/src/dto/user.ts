import type { TableIdentity } from 'vona-module-a-database';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { $locale } from '../.metadata/index.ts';

export interface IDtoOptionsUser extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsUser>({ openapi: { description: $locale('User') } })
export class DtoUser {
  @Api.field(v.description($locale('UserId')), v.tableIdentity())
  id: TableIdentity;

  @Api.field(v.min(3))
  name: string;

  @Api.field()
  married: boolean;
}
