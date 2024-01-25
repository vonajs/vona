export * from '../local/base.js';
export * from '../local/user.js';
export * from '../local/atom.js';
export * from '../local/atomClass.js';
export * from '../local/atomAction.js';
export * from '../local/atomState.js';
export * from '../local/auth.js';
export * from '../local/resource.js';
export * from '../local/comment.js';
export * from '../local/jwt.js';
export * from '../local/layoutConfig.js';
export * from '../local/category.js';
export * from '../local/tag.js';
export * from '../local/util.js';
export * from '../local/db.js';

import { LocalBase } from '../local/base.js';
import { LocalUser } from '../local/user.js';
import { LocalAtom } from '../local/atom.js';
import { LocalAtomClass } from '../local/atomClass.js';
import { LocalAtomAction } from '../local/atomAction.js';
import { LocalAtomState } from '../local/atomState.js';
import { LocalAuth } from '../local/auth.js';
import { LocalResource } from '../local/resource.js';
import { LocalComment } from '../local/comment.js';
import { LocalJwt } from '../local/jwt.js';
import { LocalLayoutConfig } from '../local/layoutConfig.js';
import { LocalCategory } from '../local/category.js';
import { LocalTag } from '../local/tag.js';
import { LocalUtil } from '../local/util.js';
import { LocalDb } from '../local/db.js';

export interface IModuleLocal {
  base: LocalBase;
  user: LocalUser;
  atom: LocalAtom;
  atomClass: LocalAtomClass;
  atomAction: LocalAtomAction;
  atomState: LocalAtomState;
  auth: LocalAuth;
  resource: LocalResource;
  comment: LocalComment;
  jwt: LocalJwt;
  layoutConfig: LocalLayoutConfig;
  category: LocalCategory;
  tag: LocalTag;
  util: LocalUtil;
  db: LocalDb;
}
