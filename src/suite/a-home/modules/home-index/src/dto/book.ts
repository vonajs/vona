import { Dto } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Dto()
export class DtoBook {
  @Rule(z.number().optional())
  id: number;

  @Rule(z.string().email())
  name: string;

  @Rule(z.boolean().optional())
  married: boolean;
}
