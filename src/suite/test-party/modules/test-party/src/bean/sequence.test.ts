import { Bean, BeanBase } from 'vona';

@Bean({ scene: 'sequence' })
export class SequenceTest extends BeanBase {
  async execute(context) {
    let value = context.value;
    return ++value;
  }
}
