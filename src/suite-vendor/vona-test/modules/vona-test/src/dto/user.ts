import { Rule, v } from 'vona-module-a-openapi';
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
