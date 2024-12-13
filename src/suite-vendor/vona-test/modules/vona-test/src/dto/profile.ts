import { Dto } from 'vona-module-a-web';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Dto()
export class DtoProfile {
  @Rule(z.number())
  id: number;

  @Rule(z.string().email())
  email: string;
}
