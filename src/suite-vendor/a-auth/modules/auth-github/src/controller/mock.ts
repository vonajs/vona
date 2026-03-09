import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsMock extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsMock>('mock', { meta: { mode: ['dev'] } })
export class ControllerMock extends BeanBase {
  @Web.get('authorize')
  async authorize() {
    return '<div>test</div>';
  }
}
