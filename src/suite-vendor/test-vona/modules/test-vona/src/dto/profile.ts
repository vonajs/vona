import { Api, v } from 'vona-module-a-openapi';
import { Dto } from 'vona-module-a-web';

@Dto()
export class DtoProfile {
  @Api.field()
  id: number;

  @Api.field(v.email())
  email: string;
}
