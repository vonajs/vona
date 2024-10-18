import { TableIdentity } from 'vona';
import { AtomClassBase, AtomClassParams } from '../atomClass/index.js';

export interface AtomKey {
  atomId: TableIdentity;
  itemId?: TableIdentity;
}

export interface ReadOptions {
  where?: object;
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
  resourceLocale?: string | false;
  role?: number;
  mode?: string;
  containerMode?: 'view' | 'edit';
  formAction?: string;
  atomIdMain?: TableIdentity;
  schema?: object;
}

export interface ReadOptionsPro extends Omit<ReadOptions, 'schema'> {
  tableName: string;
  schema: object;
  iid: number;
  userIdWho: number;
  atomId: TableIdentity;
  atomClass: AtomClassParams;
  atomClassBase: AtomClassBase;
  cms: boolean;
  forAtomUser: boolean;
}

export interface ReadParams {
  key: AtomKey;
  atomClass?: AtomClassParams;
  options?: ReadOptions;
  user?: { id: number };
}

export interface AtomReadQueryParams {
  atomClass: AtomClassParams;
  options: ReadOptionsPro;
  key: AtomKey;
  user: { id: number };
}
