import { BeanBase } from 'vona';
import { Api, Arg } from 'vona-module-a-openapi';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'performAction', meta: { mode: 'test' } })
@Api.exclude()
export class ControllerPerformAction extends BeanBase {
  @Web.post('echo')
  @Passport.public()
  echo(@Arg.body('id') id: number) {
    const url = this.scope.util.combineApiPath('performAction/echo');
    return { id, url };
  }
}
