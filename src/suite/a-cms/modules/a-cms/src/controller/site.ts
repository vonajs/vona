import { BeanBase, Controller } from 'vona';
import { ScopeModule } from '../resource/this.js';
import utils from '../common/utils.js';

@Controller()
export class ControllerSite extends BeanBase<ScopeModule> {
  async getConfigSiteBase() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigSiteBase({ atomClass });
    this.ctx.success({ data });
  }

  async getConfigSite() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigSite({ atomClass });
    this.ctx.success({ data });
  }

  async setConfigSite() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.setConfigSite({
      atomClass,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async getConfigLanguagePreview() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigLanguagePreview({
      atomClass,
      language: this.ctx.request.body.language,
    });
    this.ctx.success({ data });
  }

  async getConfigLanguage() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigLanguage({
      atomClass,
      language: this.ctx.request.body.language,
    });
    this.ctx.success({ data });
  }

  async setConfigLanguage() {
    // check demo
    this.ctx.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.setConfigLanguage({
      atomClass,
      language: this.ctx.request.body.language,
      data: this.ctx.request.body.data,
    });
    this.ctx.success(res);
  }

  async buildLanguage() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    const language = this.ctx.request.body.language;
    // progress
    const progressId = await this.ctx.bean.progress.create();
    // build
    this.scope.service.site.buildLanguageQueue({ atomClass, language, progressId });
    this.ctx.success({ progressId });
  }

  async buildLanguages() {
    // check demo
    this.ctx.bean.util.checkDemo();
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    // progress
    const progressId = await this.ctx.bean.progress.create();
    // build
    this.scope.service.site.buildLanguagesQueue({ atomClass, progressId });
    this.ctx.success({ progressId });
  }

  async getLanguages() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.getLanguages({ atomClass });
    this.ctx.success(res);
  }

  async getUrl() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.getUrl({
      atomClass,
      language: this.ctx.request.body.language,
      path: this.ctx.request.body.path,
    });
    this.ctx.success(res);
  }

  async getStats() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.getStats({
      atomClass,
      languages: this.ctx.request.body.languages,
    });
    this.ctx.success(res);
  }

  async checkFile() {
    const res = await this.scope.service.site.checkFile({
      atomId: this.ctx.request.body.atomId,
      file: this.ctx.request.body.file,
      mtime: this.ctx.request.body.mtime,
      user: this.ctx.state.user.op,
    });
    this.ctx.success(res);
  }
}
