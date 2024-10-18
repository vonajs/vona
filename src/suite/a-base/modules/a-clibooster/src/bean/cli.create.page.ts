import { Bean } from 'vona';

import { CliCreatePageBase } from '../common/cliCreatePage.js';

@Bean({ scene: 'cli.create' })
export class CliCreatePage extends CliCreatePageBase {
  constructor() {
    super('page');
  }
}
