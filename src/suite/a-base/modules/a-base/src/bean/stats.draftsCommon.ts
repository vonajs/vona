import { ScopeModule } from '../.metadata/this.js';
import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'stats' })
export class StatsDraftsCommon extends BeanBase<ScopeModule> {
  async execute(context) {
    const { keys, provider, user } = context;
    // params
    const params: any = {
      userIdUpdated: user.id,
      atomStage: 0,
      atomClosed: 0,
    };
    // draftsDrafting/draftsFlowing
    if (provider.key === 'draftsDrafting') {
      params.atomFlowId = 0;
    } else if (provider.key === 'draftsFlowing') {
      params.atomFlowId = {
        op: '>',
        val: 0,
      };
    }
    // atomClass
    let atomClass;
    if (keys.length > 1) {
      const [module, atomClassName] = keys[1].split('_');
      atomClass = await this.ctx.bean.atomClass.get({
        module,
        atomClassName,
      });
    }
    if (atomClass) {
      params.atomClassId = atomClass.id;
    }
    // count
    const modelAtom = this.scope.model.atom;
    const count = await modelAtom.count(params);
    return count;
  }
}
