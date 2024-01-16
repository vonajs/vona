import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalA extends BeanBase {
  getName() {
    return 'yang';
  }
}

@Local()
export class LocalB extends BeanBase {
  localA: LocalA;

  printName() {
    console.log(this.localA.getName());
  }
}
