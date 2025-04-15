import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoAuthSimple {
  @Api.field()
  username: string;

  @Api.field()
  password: string;
}
