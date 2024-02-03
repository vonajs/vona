import { Bean } from '@cabloy/core';
import { BeanBaseUtils } from './bean.base/bean.base_utils.js';

@Bean({ name: 'base' })
export class BeanBase2 extends BeanBaseUtils {}
