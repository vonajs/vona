import { Bean } from 'vona-module-a-bean';

import { BeanUser1 } from './bean.user/bean.user_1.js';

@Bean()
export class BeanUser extends BeanUser1 {}
