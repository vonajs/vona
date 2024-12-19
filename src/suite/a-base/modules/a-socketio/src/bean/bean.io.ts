import { Bean } from 'vona-module-a-bean';

import { BeanIoSubscribe } from './bean.io/bean.io_subscribe.js';

@Bean()
export class BeanIo extends BeanIoSubscribe {}
