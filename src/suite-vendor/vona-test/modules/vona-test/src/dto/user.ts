import { Dto } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Dto()
export class DtoUser {
  @Rule(z.number())
  id: number;

  @Rule(z.string().min(3))
  name: string;

  @Rule(z.boolean())
  married: boolean;
}
