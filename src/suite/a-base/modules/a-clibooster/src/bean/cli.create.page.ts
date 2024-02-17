import { Bean } from '@cabloy/core';

import { CliCreatePageBase } from '../common/cliCreatePage.js';

@Bean({ scene: 'cli.create' })
export class CliCreatePage extends CliCreatePageBase {
  constructor() {
    super('page');
  }
}
