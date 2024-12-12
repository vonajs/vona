import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';

export type TypeQueueRenderJobData =
  | {
      queueAction: 'buildLanguage';
      atomClass;
      language;
      progressId?;
    }
  | {
      queueAction: 'buildLanguages';
      atomClass;
      progressId;
    }
  | { queueAction: 'renderArticle'; atomClass; key; inner }
  | { queueAction: 'deleteArticle'; atomClass; key; article; inner };

export type TypeQueueRenderJobResult = unknown;

@Queue({ concurrency: true })
export class QueueRender
  extends BeanQueueBase<ScopeModule, TypeQueueRenderJobData, TypeQueueRenderJobResult>
  implements IQueueExecute<TypeQueueRenderJobData, TypeQueueRenderJobResult>
{
  async execute(data: TypeQueueRenderJobData, _options?: IQueuePushOptions): Promise<TypeQueueRenderJobResult> {
    const queueAction = data.queueAction;
    return await this[queueAction](data);
  }

  async buildLanguage({ atomClass, language, progressId }: any) {
    const build = this.app.bean.cms.build({ atomClass });
    return await build.buildLanguage({ language, progressId });
  }

  async buildLanguages({ atomClass, progressId }: any) {
    const build = this.app.bean.cms.build({ atomClass });
    return await build.buildLanguages({ progressId });
  }

  async renderArticle({ atomClass, key, inner }: any) {
    const build = this.app.bean.cms.build({ atomClass });
    return await build.renderArticle({ key, inner });
  }

  async deleteArticle({ atomClass, key, article, inner }: any) {
    const build = this.app.bean.cms.build({ atomClass });
    return await build.deleteArticle({ key, article, inner });
  }
}
