import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';
import { DtoUserLazy } from '../dto/userLazy.ts';

export interface IControllerOptionsDtoTest extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsDtoTest>('dtoTest', { meta: { mode: ['test', 'dev'] } })
export class ControllerDtoTest extends BeanBase {
  @Web.get()
  getUserLazy(): DtoUserLazy {
    return {} as any;
  }
}
