import { EntityBase, TableIdentity } from '@cabloy/core';

export interface EntityAtom extends Omit<EntityBase, 'id'> {
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
