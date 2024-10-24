import { Bean } from 'vona';
import { TestCtx1 } from './test.ctx1.js';

@Bean({ scene: 'test' })
export class TestCtx extends TestCtx1 {}
