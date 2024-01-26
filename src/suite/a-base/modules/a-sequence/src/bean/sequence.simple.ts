import { Bean, BeanBase } from '@cabloy/core';

@Bean({ scene: 'sequence' })
export class SequenceSimple extends BeanBase {
  async execute(context) {
    let value = context.value;
    return ++value;
  }
}
