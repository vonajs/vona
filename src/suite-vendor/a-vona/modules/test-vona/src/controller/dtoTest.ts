import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller, Web } from 'vona-module-a-web';
import { DtoUserRef } from '../dto/userRef.ts';

export interface IControllerOptionsDtoTest extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsDtoTest>('dtoTest', { meta: { mode: ['test', 'dev'] } })
export class ControllerDtoTest extends BeanBase {
  @Web.get()
  getUserRef(): DtoUserRef {
    return {} as any;
  }
}
