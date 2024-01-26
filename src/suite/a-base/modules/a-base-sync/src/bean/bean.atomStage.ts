import { Bean, BeanBase } from '@cabloy/core';

const __stages = ['draft', 'formal', 'history'];

@Bean()
export class BeanAtomStage extends BeanBase {
  toNumber({ atomStage }) {
    if (atomStage === undefined || atomStage === null) return atomStage;
    if (typeof atomStage === 'number') return atomStage;
    const index = __stages.findIndex(atomStage);
    return index === -1 ? null : index;
  }

  toString({ atomStage }) {
    if (atomStage === undefined || atomStage === null) return atomStage;
    if (typeof atomStage === 'string') return atomStage;
    return __stages[atomStage];
  }
}
