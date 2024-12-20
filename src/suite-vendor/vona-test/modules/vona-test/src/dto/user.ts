import { Rule, v } from 'vona-module-a-validator';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoUser {
  @Rule()
  id: number;

  @Rule(v.min(3))
  name: string;

  @Rule()
  married: boolean;
}
