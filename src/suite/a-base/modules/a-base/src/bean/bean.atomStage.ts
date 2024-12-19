import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

const __stages = ['draft', 'formal', 'history'];

@Bean()
export class BeanAtomStage extends BeanBase {
  toNumber({ atomStage }: any) {
    if (atomStage === undefined || atomStage === null) return atomStage;
    if (typeof atomStage === 'number') return atomStage;
    const index = __stages.findIndex(atomStage);
    return index === -1 ? null : index;
  }

  toString({ atomStage }: any) {
    if (atomStage === undefined || atomStage === null) return atomStage;
    if (typeof atomStage === 'string') return atomStage;
    return __stages[atomStage];
  }
}
