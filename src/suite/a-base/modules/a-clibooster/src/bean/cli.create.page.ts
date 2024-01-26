import { Bean, BeanBase } from '@cabloy/core';

const CliCreatePageFn = require('../common/cliCreatePage.js');

@Bean({ scene: 'cli.create' })
export class CliCreatePage extends BeanBase {}
