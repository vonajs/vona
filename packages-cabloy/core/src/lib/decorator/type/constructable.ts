import { BeanBase } from '../../../index.js';

export type BeanConstructable<T extends BeanBase> = new (...args: any[]) => T;
