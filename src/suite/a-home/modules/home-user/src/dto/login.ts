import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsLogin extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsLogin>()
export class DtoLogin {
  @Api.field()
  username: string;

  @Api.field()
  password: string;
}
