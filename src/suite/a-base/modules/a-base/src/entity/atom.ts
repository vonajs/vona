import { TableIdentity } from 'vona-module-a-core';
import { OmitType } from 'vona-module-a-swagger';
import { Entity } from 'vona';
import { EntityBaseTemp } from '../types.js';

@Entity('aAtom')
export class EntityAtom extends OmitType(EntityBaseTemp, ['id']) {
  id: TableIdentity;
  itemId: TableIdentity;
  atomStage: number;
  atomFlowId: number;
  atomClassId: number;
  atomName: string;
  userIdCreated: number;
  userIdUpdated: number;
  allowComment: number;
  starCount: number;
  commentCount: number;
  attachmentCount: number;
  readCount: number;
  roleIdOwner: number;
  atomClosed: number;
  atomIdDraft: TableIdentity;
  atomIdFormal: TableIdentity;
  atomStatic: number;
  atomStaticKey: string;
  atomRevision: number;
  atomDisabled: number;
  atomLanguage: string;
  atomCategoryId: number;
  atomTags: string;
  atomSimple: number;
  atomState: string;
}

export interface EntityAtomPro extends EntityAtom {
  atomId: TableIdentity;
  module: string;
  atomClassName: string;
  atomCreatedAt: Date;
  atomUpdatedAt: Date;
}
