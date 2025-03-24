import { BeanBase } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { SymbolUploadValue } from 'vona-module-a-upload';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'upload', meta: { mode: ['test', 'local'] } })
export class ControllerUpload extends BeanBase {
  @Web.post('fields')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  fields() {
    return this.ctx[SymbolUploadValue];
  }

  @Web.post('file')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  file() {
    return this.ctx[SymbolUploadValue];
  }

  @Web.post('files')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  files() {
    return this.ctx[SymbolUploadValue];
  }
}
