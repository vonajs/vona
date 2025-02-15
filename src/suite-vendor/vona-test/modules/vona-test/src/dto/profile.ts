import { Rule, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoProfile {
  @Rule()
  id: number;

  @Rule(v.email())
  email: string;
}
