import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'sequence' })
export class SequenceSimple extends BeanBase {
  async execute(context) {
    let value = context.value;
    return ++value;
  }
}
