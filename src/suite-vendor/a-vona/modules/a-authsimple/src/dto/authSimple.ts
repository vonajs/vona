import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsAuthSimple extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsAuthSimple>()
export class DtoAuthSimple {
  @Api.field()
  username: string;

  @Api.field()
  password: string;
}
