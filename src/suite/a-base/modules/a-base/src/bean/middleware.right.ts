import { MiddlewareRightResource } from './middleware.right/middleware.right_resource.js';
import { Middleware } from 'vona-module-a-aspect';

@Middleware()
export class MiddlewareRight extends MiddlewareRightResource {}
