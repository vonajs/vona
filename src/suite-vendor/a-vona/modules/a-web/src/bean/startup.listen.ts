import type { IStartupExecute } from 'vona-module-a-startup';
import { BeanBase } from 'vona';
import { Startup } from 'vona-module-a-startup';

@Startup()
export class StartupListen extends BeanBase implements IStartupExecute {
  async execute() {}
}
