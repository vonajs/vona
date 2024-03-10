import { EntityBase } from '@cabloy/core';

export interface EntityAtom extends EntityBase {
  itemId: number;
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
  atomIdDraft: number;
  atomIdFormal: number;
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
