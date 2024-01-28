import { Bean } from '@cabloy/core';

import { CliCreatePageBase } from '../common/cliCreatePage.js';

@Bean({ scene: 'cli.create' })
export class CliCreatePagex extends CliCreatePageBase {
  constructor(options) {
    super(options, 'pagex');
  }
}
