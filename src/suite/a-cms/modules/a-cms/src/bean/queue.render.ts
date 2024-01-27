import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'queue' })
export class QueueRender extends BeanBase {
  async execute(context) {
    const data = context.data;
    const queueAction = data.queueAction;
    return await this[queueAction](data);
  }

  async buildLanguage({ atomClass, language, progressId }: any) {
    const build = this.ctx.bean.cms.build({ atomClass });
    return await build.buildLanguage({ language, progressId });
  }

  async buildLanguages({ atomClass, progressId }: any) {
    const build = this.ctx.bean.cms.build({ atomClass });
    return await build.buildLanguages({ progressId });
  }

  async renderArticle({ atomClass, key, inner }: any) {
    const build = this.ctx.bean.cms.build({ atomClass });
    return await build.renderArticle({ key, inner });
  }

  async deleteArticle({ atomClass, key, article, inner }: any) {
    const build = this.ctx.bean.cms.build({ atomClass });
    return await build.deleteArticle({ key, article, inner });
  }
}
