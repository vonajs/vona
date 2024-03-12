import { AtomClassParams } from './atomClass.js';

export interface SelectOptions {
  where?: object;
  orders?: Array<any>;
}

export interface SelectParams {
  atomClass?: AtomClassParams;
  options?: SelectOptions;
  user?: { id: number };
  pageForce?: boolean;
}

export interface CountParams {
  atomClass?: AtomClassParams;
  options?: Omit<SelectOptions, 'orders'>;
  user?: { id: number };
  pageForce?: boolean;
}
