import type { DtoAuth } from 'vona-module-a-auth';
import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { EntityRole } from 'vona-module-home-user';
import { EntityUser } from '../entity/user.ts';

export interface IDtoOptionsPassport extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsPassport>()
export class DtoPassport {
  @Api.field()
  user: EntityUser;

  @Api.field()
  auth: DtoAuth;

  @Api.field(v.array(EntityRole))
  roles: EntityRole[];
}
