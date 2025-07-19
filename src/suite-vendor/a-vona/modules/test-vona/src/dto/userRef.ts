import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoRoleRef } from './roleRef.ts';

export interface IDtoOptionsUserRef extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsUserRef>()
export class DtoUserRef {
  @Api.field()
  name: string;

  @Api.field(v.ref(v.optional(), () => DtoUserRef))
  user?: DtoUserRef;

  @Api.field(v.optional(), v.array(v.ref(() => DtoRoleRef)))
  roles?: DtoRoleRef[];
}
