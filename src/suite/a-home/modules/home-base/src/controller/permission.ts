import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

export interface IControllerOptionsPermission extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPermission>('permission')
export class ControllerPermission extends BeanBase {}
