import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { DtoUser } from './user.ts';

export interface IDtoOptionsUserRef extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsUserRef>()
export class DtoUserRef {
  @Api.field()
  name: string;

  @Api.field(v.ref(() => DtoUser))
  user?: DtoUserRef;
}
