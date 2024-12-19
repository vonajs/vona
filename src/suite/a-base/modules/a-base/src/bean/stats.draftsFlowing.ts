import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'stats' })
export class StatsDraftsFlowing extends BeanBase {
  async execute(context) {
    const { user } = context;
    const modelAtom = this.scope.model.atom;
    const count = await modelAtom.count({
      where: {
        userIdUpdated: user.id,
        atomStage: 0,
        atomClosed: 0,
        atomFlowId: {
          op: '>',
          val: 0,
        },
      },
    });
    return count;
  }
}
