import { BeanBase, Local } from '@cabloy/core';

@Local({ name: 'a' })
export class LocalA extends BeanBase {
  getName() {
    return 'yang';
  }
}

@Local({ name: 'b' })
export class LocalB extends BeanBase {
  localA: LocalA;

  printName() {
    console.log(this.localA.getName());
  }
}
