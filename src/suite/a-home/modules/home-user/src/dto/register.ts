import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsRegister extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsRegister>()
export class DtoRegister {
  @Api.field()
  username: string;

  @Api.field()
  password: string;

  @Api.field()
  email: string;
}
