import type { BodyParserOptions } from '../types/bodyParser.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanBodyReq extends BeanBase {
  async parse(options: BodyParserOptions) {
    return await this.scope.service.bodyReq.parse(false);
  }
}
