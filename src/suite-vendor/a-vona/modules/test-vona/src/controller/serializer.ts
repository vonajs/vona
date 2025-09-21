import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

export interface IControllerOptionsSerializer extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsSerializer>({ path: 'serializer', meta: { mode: ['test', 'dev'] } })
export class ControllerSerializer extends BeanBase {}
