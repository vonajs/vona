import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceRender extends BeanBase {
  async getArticleUrl({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter }: any) {
    // atomClass
    const { key, atomClass, options } = await this.app.bean.atom._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    const build = this.app.bean.cms.build({ atomClass });
    return await build.getArticleUrl({ key, options });
  }

  // site<plugin<theme<site(db)<language(db)
  async combineSiteBase({ atomClass, mergeConfigSite }: any) {
    const build = this.app.bean.cms.build({ atomClass });
    return await build.combineSiteBase({ mergeConfigSite });
  }

  async getArticle({ key, inner }: any) {
    // 1. try to get article: maybe not exits
    const article = await this.app.bean.atom.read({ key, user: { id: 0 } });
    if (!article) return null;
    // 2. check right
    if (!inner) {
      // check right
      const roleAnonymous = await this.app.bean.role.getSystemRole({ roleName: 'anonymous' });
      const right = await this.app.bean.atom.checkRoleRightRead({
        atom: { id: key.atomId },
        roleId: roleAnonymous!.id,
      });
      if (!right) return null;
    }
    // maybe site.language is false
    // // check atomLanguage
    // if (!article.atomLanguage) {
    //   article.atomLanguage = this.ctx.locale;
    //   // return null;
    //   // this.app.throw(1001);
    // }
    return article;
  }

  async _deleteArticlePushAsync({ atomClass, key, article, inner }: any) {
    if (!atomClass) {
      atomClass = await this.app.bean.atomClass.getByAtomId({ atomId: key.atomId });
    }
    this.ctx.tail(async () => {
      // queue
      await this.scope.queue.render.pushAsync(
        { queueAction: 'deleteArticle', atomClass, key, article, inner },
        { queueNameSub: `${atomClass.module}:${atomClass.atomClassName}` },
      );
    });
  }

  async _deleteArticlePush({ atomClass, key, article, inner }: any) {
    if (!atomClass) {
      atomClass = await this.app.bean.atomClass.getByAtomId({ atomId: key.atomId });
    }
    this.ctx.tail(() => {
      // queue
      this.scope.queue.render.push(
        { queueAction: 'deleteArticle', atomClass, key, article, inner },
        {
          queueNameSub: `${atomClass.module}:${atomClass.atomClassName}`,
        },
      );
    });
  }

  async _renderArticlePushAsync({ atomClass, key, inner }: any) {
    if (!atomClass) {
      atomClass = await this.app.bean.atomClass.getByAtomId({ atomId: key.atomId });
    }
    this.ctx.tail(async () => {
      // queue
      await this.scope.queue.render.pushAsync(
        { queueAction: 'renderArticle', atomClass, key, inner },
        { queueNameSub: `${atomClass.module}:${atomClass.atomClassName}` },
      );
    });
  }

  async _renderArticlePush({ atomClass, key, inner }: any) {
    if (!atomClass) {
      atomClass = await this.app.bean.atomClass.getByAtomId({ atomId: key.atomId });
    }
    this.ctx.tail(() => {
      // queue
      this.scope.queue.render.push(
        { queueAction: 'renderArticle', atomClass, key, inner },
        { queueNameSub: `${atomClass.module}:${atomClass.atomClassName}` },
      );
    });
  }
}
