import { Bean } from '@cabloy/core';
import { BeanIoSubscribe } from './bean.io/bean.io_subscribe.js';

@Bean()
export class BeanIo extends BeanIoSubscribe {}
