import { Bean } from '@cabloy/core';

import CliCreatePageFn from '../common/cliCreatePage.js';

@Bean({ scene: 'cli.create' })
export class CliCreatePage extends CliCreatePageFn('page') {}
