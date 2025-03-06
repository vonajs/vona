import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { bodyParserWrapper } from '../lib/body-parser.ts';

@Bean()
export class BeanBody extends BeanBase {
  async parse() {
    return await bodyParserWrapper(this.ctx, this.scope.config.parser);
  }
}
