import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsMock extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsMock>('mock', { meta: { mode: ['dev'] } })
export class ControllerMock extends BeanBase {
  @Web.get('authorize')
  @Passport.public()
  async authorize() {
    return '<div>test</div>';
  }
}
