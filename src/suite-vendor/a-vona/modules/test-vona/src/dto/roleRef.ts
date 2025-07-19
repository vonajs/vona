import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoUserRef } from './userRef.ts';

export interface IDtoOptionsRoleRef extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsRoleRef>()
export class DtoRoleRef {
  @Api.field()
  name: string;

  @Api.field(v.optional(), v.array(v.ref(() => DtoUserRef)))
  users?: typeof DtoUserRef;
}
