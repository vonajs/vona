import { Dto } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Dto()
export class DtoProfile {
  @Rule(z.number())
  id: number;

  @Rule(z.string().email())
  email: string;
}
