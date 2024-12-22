import { Dto } from 'vona-module-a-web';
import { Rule, v } from 'vona-module-a-openapi';

@Dto()
export class DtoProfile {
  @Rule()
  id: number;

  @Rule(v.email())
  email: string;
}
