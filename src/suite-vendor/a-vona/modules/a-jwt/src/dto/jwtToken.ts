import type { IJwtToken } from '../types/jwt.ts';
import { Rule } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';
import { z } from 'zod';

@Dto()
export class DtoJwtToken implements IJwtToken {
  @Rule(z.string())
  accessToken: string;

  @Rule(z.string())
  refreshToken: string;

  @Rule(z.number())
  expiresIn: number;
}
