import { TableIdentity } from '@cabloy/core';
import { AtomClassBase, AtomClassParams } from './atomClass.js';

export interface SelectOptionsPage {
  index: number;
  size?: number;
}

export interface SelectOptions {
  where?: object;
  orders?: Array<any>;
  page?: SelectOptionsPage;
  star?: number;
  label?: number;
  comment?: number;
  file?: number;
  stage?: 0 | 1 | 2 | 'draft' | 'formal' | 'history';
  language?: string;
  category?: number;
  tag?: number;
  mine?: number;
  resource?: number;
  resourceLocale?: string;
  role?: number;
  mode?: string;
  containerMode?: 'view' | 'edit';
  formAction?: string;
  atomIdMain?: TableIdentity;
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
export interface SelectOptionsProSafe extends Omit<SelectOptionsPro, 'stage' | 'page'> {
  stage: number;
  page: SelectOptionsPage;
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
  atomClass: AtomClassParams;
  options: SelectOptionsPro;
  user?: { id: number };
}
