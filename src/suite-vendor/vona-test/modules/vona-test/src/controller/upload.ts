import type { IUploadField } from 'vona-module-a-upload';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { Arg } from 'vona-module-a-openapi';
import { SymbolUploadValue } from 'vona-module-a-upload';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'upload', meta: { mode: ['test', 'local'] } })
export class ControllerUpload extends BeanBase {
  @Web.post('fields')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  fields(@Arg.fields() fields: IUploadField[], @Arg.fields('name') field: IUploadField) {
    assert.equal(fields.find(item => item.name === 'name')?.value, 'zhennann');
    assert.equal(field.value, 'zhennann');
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
