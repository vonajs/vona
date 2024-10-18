import { Bean } from 'vona';
import { MiddlewareRightResource } from './middleware.right/middleware.right_resource.js';

@Bean({ scene: 'middleware' })
export class MiddlewareRight extends MiddlewareRightResource {}
