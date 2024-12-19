import { BeanTemp } from 'vona-module-a-bean';

import { CliCreatePageBase } from '../common/cliCreatePage.js';

@BeanTemp({ scene: 'cli.create' })
export class CliCreatePage extends CliCreatePageBase {
  constructor() {
    super('page');
  }
}
