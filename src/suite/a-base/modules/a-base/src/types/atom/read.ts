import { TableIdentity } from '@cabloy/core';
import { AtomClassParams } from '../atomClass/index.js';

export interface AtomKey {
  atomId: TableIdentity;
  itemId: TableIdentity;
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
  resourceLocale?: string;
  role?: number;
  mode?: string;
  containerMode?: 'view' | 'edit';
  formAction?: string;
  atomIdMain?: TableIdentity;
}

export interface ReadParams {
  key: AtomKey;
  atomClass?: AtomClassParams;
  options: ReadOptions;
  user?: { id: number };
}
