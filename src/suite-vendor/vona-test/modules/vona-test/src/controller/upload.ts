import { BeanBase } from 'vona';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'upload', meta: { mode: 'test' } })
export class ControllerUpload extends BeanBase {
  @Web.post('fields')
  @Passport.public()
  fields() {
    console.log(this.ctx.req);
    return true;
  }
}
