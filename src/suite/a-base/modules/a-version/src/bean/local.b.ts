import { BeanBase, Local, Use } from '@cabloy/core';
import { LocalA } from './local.a.js';

@Local()
export class LocalB extends BeanBase {
  @Use()
  localA: LocalA;

  printName() {
    this.localA.module('a-version').getName();
    console.log(this.localA.getName());
  }
}
