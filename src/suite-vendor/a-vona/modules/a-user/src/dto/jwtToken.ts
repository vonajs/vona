import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoJwtToken {
  @Api.field()
  accessToken: string;

  @Api.field()
  refreshToken: string;

  @Api.field()
  expiresIn: number;
}
