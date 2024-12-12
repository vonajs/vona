import { BeanBase, Controller } from 'vona';
import utils from '../common/utils.js';

@Controller()
export class ControllerSite extends BeanBase {
  async getConfigSiteBase() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigSiteBase({ atomClass });
    this.app.success({ data });
  }

  async getConfigSite() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigSite({ atomClass });
    this.app.success({ data });
  }

  async setConfigSite() {
    // check demo
    this.app.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.setConfigSite({
      atomClass,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async getConfigLanguagePreview() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigLanguagePreview({
      atomClass,
      language: this.ctx.request.body.language,
    });
    this.app.success({ data });
  }

  async getConfigLanguage() {
    const atomClass = this.ctx.request.body.atomClass;
    const data = await this.scope.service.site.getConfigLanguage({
      atomClass,
      language: this.ctx.request.body.language,
    });
    this.app.success({ data });
  }

  async setConfigLanguage() {
    // check demo
    this.app.bean.util.checkDemo();
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.setConfigLanguage({
      atomClass,
      language: this.ctx.request.body.language,
      data: this.ctx.request.body.data,
    });
    this.app.success(res);
  }

  async buildLanguage() {
    // check demo
    this.app.bean.util.checkDemo();
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    const language = this.ctx.request.body.language;
    // progress
    const progressId = await this.app.bean.progress.create();
    // build
    this.scope.service.site.buildLanguageQueue({ atomClass, language, progressId });
    this.app.success({ progressId });
  }

  async buildLanguages() {
    // check demo
    this.app.bean.util.checkDemo();
    // atomClass
    const atomClass = utils.atomClass(this.ctx.request.body.atomClass);
    // progress
    const progressId = await this.app.bean.progress.create();
    // build
    this.scope.service.site.buildLanguagesQueue({ atomClass, progressId });
    this.app.success({ progressId });
  }

  async getLanguages() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.getLanguages({ atomClass });
    this.app.success(res);
  }

  async getUrl() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.getUrl({
      atomClass,
      language: this.ctx.request.body.language,
      path: this.ctx.request.body.path,
    });
    this.app.success(res);
  }

  async getStats() {
    const atomClass = this.ctx.request.body.atomClass;
    const res = await this.scope.service.site.getStats({
      atomClass,
      languages: this.ctx.request.body.languages,
    });
    this.app.success(res);
  }

  async checkFile() {
    const res = await this.scope.service.site.checkFile({
      atomId: this.ctx.request.body.atomId,
      file: this.ctx.request.body.file,
      mtime: this.ctx.request.body.mtime,
      user: this.ctx.state.user.op,
    });
    this.app.success(res);
  }
}
