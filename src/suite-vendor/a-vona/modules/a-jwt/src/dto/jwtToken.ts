import type { IDecoratorDtoOptions } from 'vona-module-a-web';
import type { IJwtToken } from '../types/jwt.ts';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

export interface IDtoOptionsJwtToken extends IDecoratorDtoOptions {}

@Dto<IDtoOptionsJwtToken>()
export class DtoJwtToken implements IJwtToken {
  @Api.field()
  accessToken: string;

  @Api.field()
  refreshToken: string;

  @Api.field()
  expiresIn: number;
}
