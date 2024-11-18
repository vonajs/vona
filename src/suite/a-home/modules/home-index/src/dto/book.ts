import { Dto } from 'vona';
import { Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Dto()
export class DtoBook {
  @Rule(z.number().optional())
  id: number;

  @Rule(z.string())
  name: string;

  //@Rule(z.boolean())
  married: boolean;
}
