import { Bean } from 'vona';
import { TestCtx1 } from './test.ctx1.js';

@Bean()
export class BeanTestCtx extends TestCtx1 {}
