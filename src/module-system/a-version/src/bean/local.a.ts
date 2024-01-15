import { BeanBase, Local } from '@cabloy/core';

@Local({ name: 'a' })
export class TestA extends BeanBase {
  getName() {
    return 'yang';
  }
}

@Local({ name: 'b' })
export class TestB extends BeanBase {
  testA: TestA;

  printName() {
    console.log(this.testA.getName());
  }
}
