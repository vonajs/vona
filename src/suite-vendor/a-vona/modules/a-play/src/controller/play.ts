import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

export interface IControllerOptionsPlay extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPlay>('play')
export class ControllerPlay extends BeanBase {}
