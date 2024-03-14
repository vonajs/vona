import { IModelSelectParamsPage } from 'cabloy-module-api-a-database';
import { AtomClassBase, AtomClassParams } from '../atomClass/index.js';
import { ReadOptions } from './read.js';

export type SelectOptionsPage = IModelSelectParamsPage;

export interface SelectOptions extends ReadOptions {
  orders?: Array<Array<any>>;
  page?: SelectOptionsPage;
}

export interface SelectOptionsPro extends SelectOptions {
  tableName: string;
  schema: object;
  iid: number;
  userIdWho: number;
  atomClass?: AtomClassParams;
  atomClassBase?: AtomClassBase;
  count: number;
  cms: boolean;
  forAtomUser: boolean;
}

/** for inner use */
export interface SelectOptionsProSafe extends Omit<SelectOptionsPro, 'stage'> {
  stage: number;
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

export interface AtomSelectQueryParams {
  atomClass?: AtomClassParams;
  options: SelectOptionsPro;
  user: { id: number };
}
