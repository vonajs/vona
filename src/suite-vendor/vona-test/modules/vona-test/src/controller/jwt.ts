import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller({ path: 'jwt', meta: { mode: 'test' } })
export class ControllerJwt extends BeanBase {
}
