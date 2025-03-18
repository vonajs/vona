import { Rule } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoJwtToken {
  @Rule()
  accessToken: string;

  @Rule()
  refreshToken: string;

  @Rule()
  expiresIn: number;
}
