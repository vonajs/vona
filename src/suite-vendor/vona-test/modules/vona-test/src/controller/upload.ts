import type { IUploadField, IUploadFile } from 'vona-module-a-upload';
import assert from 'node:assert';
import { BeanBase } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { Arg, v } from 'vona-module-a-openapi';
import { SymbolUploadValue } from 'vona-module-a-upload';
import { Passport } from 'vona-module-a-user';
import { Controller, Web } from 'vona-module-a-web';

@Controller({ path: 'upload', meta: { mode: ['test', 'local'] } })
export class ControllerUpload extends BeanBase {
  @Web.post('fields')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  fields(@Arg.fields() fields: IUploadField[], @Arg.fields('name', v.default('zhennann'), v.description('your name')) name: string) {
    assert.equal(fields.find(item => item.name === 'name')?.value, 'zhennann');
    assert.equal(name, 'zhennann');
    return this.ctx[SymbolUploadValue];
  }

  @Web.post('file')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  file(@Arg.fields('name', v.default('zhennann')) name: string, @Arg.file('welcome') file: IUploadFile) {
    assert.equal(name, 'zhennann');
    assert.equal(file.name, 'welcome');
    return this.ctx[SymbolUploadValue];
  }

  @Web.post('files')
  @Passport.public()
  @Aspect.interceptor('a-upload:upload')
  files(
    @Arg.files(v.description('more files')) files: IUploadFile[],
    @Arg.files('images', v.description('images')) images: IUploadFile[],
    @Arg.file('welcome1', v.description('single file')) file1: IUploadFile,
    @Arg.file('welcome2')file2: IUploadFile,
  ) {
    assert.equal(files.find(item => item.name === 'welcome1')?.name, 'welcome1');
    assert.equal(images.find(item => item.name === 'images')?.name, 'images');
    assert.equal(file1.name, 'welcome1');
    assert.equal(file2.name, 'welcome2');
    return this.ctx[SymbolUploadValue];
  }
}
