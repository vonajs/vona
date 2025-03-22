import type { IJwtToken } from '../types/jwt.ts';
import { Api } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { z } from 'zod';

@Dto()
export class DtoJwtToken implements IJwtToken {
  @Api.field(z.string())
  accessToken: string;

  @Api.field(z.string())
  refreshToken: string;

  @Api.field(z.number())
  expiresIn: number;
}
