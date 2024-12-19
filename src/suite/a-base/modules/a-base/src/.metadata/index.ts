/** beans: begin */
export * from '../bean/stats.draftsCommon.js';
export * from '../bean/stats.draftsFlowing.js';
export * from '../bean/stats.labels.js';
export * from '../bean/stats.stars.js';
export * from '../bean/stats.starsLabels.js';
export * from '../bean/version.manager.js';
import { StatsDraftsCommon } from '../bean/stats.draftsCommon.js';
import { StatsDraftsFlowing } from '../bean/stats.draftsFlowing.js';
import { StatsLabels } from '../bean/stats.labels.js';
import { StatsStars } from '../bean/stats.stars.js';
import { StatsStarsLabels } from '../bean/stats.starsLabels.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {}

  export interface IBeanRecordGeneral {
    'a-base.stats.draftsCommon': StatsDraftsCommon;
    'a-base.stats.draftsFlowing': StatsDraftsFlowing;
    'a-base.stats.labels': StatsLabels;
    'a-base.stats.stars': StatsStars;
    'a-base.stats.starsLabels': StatsStarsLabels;
    'a-base.version.manager': VersionManager;
  }
}
declare module 'vona-module-a-base' {
  export interface StatsDraftsCommon {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface StatsDraftsFlowing {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface StatsLabels {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface StatsStars {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface StatsStarsLabels {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface VersionManager {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** beans: end */
/** entity: begin */
export * from '../entity/atom.js';
export * from '../entity/atomAction.js';
export * from '../entity/atomClass.js';
export * from '../entity/atomLabel.js';
export * from '../entity/atomLabelRef.js';
export * from '../entity/atomStar.js';
export * from '../entity/category.js';
export * from '../entity/comment.js';
export * from '../entity/commentHeart.js';
export * from '../entity/commentView.js';
export * from '../entity/label.js';
export * from '../entity/resource.js';
export * from '../entity/resourceLocale.js';
export * from '../entity/resourceRole.js';
export * from '../entity/role.js';
export * from '../entity/roleExpand.js';
export * from '../entity/roleFieldsRight.js';
export * from '../entity/roleInc.js';
export * from '../entity/roleIncRef.js';
export * from '../entity/roleRef.js';
export * from '../entity/roleRight.js';
export * from '../entity/roleRightRef.js';
export * from '../entity/tag.js';
export * from '../entity/tagRef.js';
export * from '../entity/user.js';
export * from '../entity/userAgent.js';
export * from '../entity/userRole.js';
export * from '../entity/userRoleIncRef.js';
export * from '../entity/userRoleRef.js';

import { IDecoratorEntityOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IEntityRecord {
    'a-base:atom': IDecoratorEntityOptions;
    'a-base:atomAction': IDecoratorEntityOptions;
    'a-base:atomClass': IDecoratorEntityOptions;
    'a-base:atomLabel': IDecoratorEntityOptions;
    'a-base:atomLabelRef': IDecoratorEntityOptions;
    'a-base:atomStar': IDecoratorEntityOptions;
    'a-base:category': IDecoratorEntityOptions;
    'a-base:comment': IDecoratorEntityOptions;
    'a-base:commentHeart': IDecoratorEntityOptions;
    'a-base:commentView': IDecoratorEntityOptions;
    'a-base:label': IDecoratorEntityOptions;
    'a-base:resource': IDecoratorEntityOptions;
    'a-base:resourceLocale': IDecoratorEntityOptions;
    'a-base:resourceRole': IDecoratorEntityOptions;
    'a-base:role': IDecoratorEntityOptions;
    'a-base:roleExpand': IDecoratorEntityOptions;
    'a-base:roleFieldsRight': IDecoratorEntityOptions;
    'a-base:roleInc': IDecoratorEntityOptions;
    'a-base:roleIncRef': IDecoratorEntityOptions;
    'a-base:roleRef': IDecoratorEntityOptions;
    'a-base:roleRight': IDecoratorEntityOptions;
    'a-base:roleRightRef': IDecoratorEntityOptions;
    'a-base:tag': IDecoratorEntityOptions;
    'a-base:tagRef': IDecoratorEntityOptions;
    'a-base:user': IDecoratorEntityOptions;
    'a-base:userAgent': IDecoratorEntityOptions;
    'a-base:userRole': IDecoratorEntityOptions;
    'a-base:userRoleIncRef': IDecoratorEntityOptions;
    'a-base:userRoleRef': IDecoratorEntityOptions;
  }
}
declare module 'vona-module-a-base' {}
/** entity: end */
/** entity: begin */
import { EntityAtom } from '../entity/atom.js';
import { EntityAtomAction } from '../entity/atomAction.js';
import { EntityAtomClass } from '../entity/atomClass.js';
import { EntityAtomLabel } from '../entity/atomLabel.js';
import { EntityAtomLabelRef } from '../entity/atomLabelRef.js';
import { EntityAtomStar } from '../entity/atomStar.js';
import { EntityCategory } from '../entity/category.js';
import { EntityComment } from '../entity/comment.js';
import { EntityCommentHeart } from '../entity/commentHeart.js';
import { EntityCommentView } from '../entity/commentView.js';
import { EntityLabel } from '../entity/label.js';
import { EntityResource } from '../entity/resource.js';
import { EntityResourceLocale } from '../entity/resourceLocale.js';
import { EntityResourceRole } from '../entity/resourceRole.js';
import { EntityRole } from '../entity/role.js';
import { EntityRoleExpand } from '../entity/roleExpand.js';
import { EntityRoleFieldsRight } from '../entity/roleFieldsRight.js';
import { EntityRoleInc } from '../entity/roleInc.js';
import { EntityRoleIncRef } from '../entity/roleIncRef.js';
import { EntityRoleRef } from '../entity/roleRef.js';
import { EntityRoleRight } from '../entity/roleRight.js';
import { EntityRoleRightRef } from '../entity/roleRightRef.js';
import { EntityTag } from '../entity/tag.js';
import { EntityTagRef } from '../entity/tagRef.js';
import { EntityUser } from '../entity/user.js';
import { EntityUserAgent } from '../entity/userAgent.js';
import { EntityUserRole } from '../entity/userRole.js';
import { EntityUserRoleIncRef } from '../entity/userRoleIncRef.js';
import { EntityUserRoleRef } from '../entity/userRoleRef.js';
export interface IModuleEntity {
  atom: EntityAtom;
  atomAction: EntityAtomAction;
  atomClass: EntityAtomClass;
  atomLabel: EntityAtomLabel;
  atomLabelRef: EntityAtomLabelRef;
  atomStar: EntityAtomStar;
  category: EntityCategory;
  comment: EntityComment;
  commentHeart: EntityCommentHeart;
  commentView: EntityCommentView;
  label: EntityLabel;
  resource: EntityResource;
  resourceLocale: EntityResourceLocale;
  resourceRole: EntityResourceRole;
  role: EntityRole;
  roleExpand: EntityRoleExpand;
  roleFieldsRight: EntityRoleFieldsRight;
  roleInc: EntityRoleInc;
  roleIncRef: EntityRoleIncRef;
  roleRef: EntityRoleRef;
  roleRight: EntityRoleRight;
  roleRightRef: EntityRoleRightRef;
  tag: EntityTag;
  tagRef: EntityTagRef;
  user: EntityUser;
  userAgent: EntityUserAgent;
  userRole: EntityUserRole;
  userRoleIncRef: EntityUserRoleIncRef;
  userRoleRef: EntityUserRoleRef;
}
/** entity: end */
/** entity: begin */
declare module 'vona-module-a-base' {
  export interface EntityAtom {
    column: <K extends keyof Omit<EntityAtom, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAtom, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAtomAction {
    column: <K extends keyof Omit<EntityAtomAction, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAtomAction, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAtomClass {
    column: <K extends keyof Omit<EntityAtomClass, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAtomClass, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAtomLabel {
    column: <K extends keyof Omit<EntityAtomLabel, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAtomLabel, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAtomLabelRef {
    column: <K extends keyof Omit<EntityAtomLabelRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAtomLabelRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityAtomStar {
    column: <K extends keyof Omit<EntityAtomStar, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityAtomStar, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityCategory {
    column: <K extends keyof Omit<EntityCategory, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityCategory, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityComment {
    column: <K extends keyof Omit<EntityComment, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityComment, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityCommentHeart {
    column: <K extends keyof Omit<EntityCommentHeart, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityCommentHeart, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityCommentView {
    column: <K extends keyof Omit<EntityCommentView, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityCommentView, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityLabel {
    column: <K extends keyof Omit<EntityLabel, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityLabel, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityResource {
    column: <K extends keyof Omit<EntityResource, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityResource, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityResourceLocale {
    column: <K extends keyof Omit<EntityResourceLocale, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityResourceLocale, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityResourceRole {
    column: <K extends keyof Omit<EntityResourceRole, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityResourceRole, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRole {
    column: <K extends keyof Omit<EntityRole, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRole, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleExpand {
    column: <K extends keyof Omit<EntityRoleExpand, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleExpand, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleFieldsRight {
    column: <K extends keyof Omit<EntityRoleFieldsRight, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleFieldsRight, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleInc {
    column: <K extends keyof Omit<EntityRoleInc, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleInc, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleIncRef {
    column: <K extends keyof Omit<EntityRoleIncRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleIncRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleRef {
    column: <K extends keyof Omit<EntityRoleRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleRight {
    column: <K extends keyof Omit<EntityRoleRight, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleRight, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityRoleRightRef {
    column: <K extends keyof Omit<EntityRoleRightRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityRoleRightRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityTag {
    column: <K extends keyof Omit<EntityTag, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityTag, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityTagRef {
    column: <K extends keyof Omit<EntityTagRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityTagRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityUser {
    column: <K extends keyof Omit<EntityUser, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUser, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityUserAgent {
    column: <K extends keyof Omit<EntityUserAgent, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUserAgent, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityUserRole {
    column: <K extends keyof Omit<EntityUserRole, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUserRole, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityUserRoleIncRef {
    column: <K extends keyof Omit<EntityUserRoleIncRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUserRoleIncRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }

  export interface EntityUserRoleRef {
    column: <K extends keyof Omit<EntityUserRoleRef, 'column' | 'columns' | 'table'>>(column: K) => K;
    columns: <K extends keyof Omit<EntityUserRoleRef, 'column' | 'columns' | 'table'>>(...columns: K[]) => K[];
  }
}
/** entity: end */
/** model: begin */
export * from '../model/atom.js';
export * from '../model/atomAction.js';
export * from '../model/atomClass.js';
export * from '../model/atomLabel.js';
export * from '../model/atomLabelRef.js';
export * from '../model/atomStar.js';
export * from '../model/category.js';
export * from '../model/comment.js';
export * from '../model/commentHeart.js';
export * from '../model/commentView.js';
export * from '../model/label.js';
export * from '../model/resource.js';
export * from '../model/resourceLocale.js';
export * from '../model/resourceRole.js';
export * from '../model/role.js';
export * from '../model/roleExpand.js';
export * from '../model/roleFieldsRight.js';
export * from '../model/roleInc.js';
export * from '../model/roleIncRef.js';
export * from '../model/roleRef.js';
export * from '../model/roleRight.js';
export * from '../model/roleRightRef.js';
export * from '../model/tag.js';
export * from '../model/tagRef.js';
export * from '../model/user.js';
export * from '../model/userAgent.js';
export * from '../model/userRole.js';
export * from '../model/userRoleIncRef.js';
export * from '../model/userRoleRef.js';

import { IDecoratorModelOptions } from 'vona-module-a-database';
declare module 'vona-module-a-database' {
  export interface IModelRecord {
    'a-base:atom': IDecoratorModelOptions;
    'a-base:atomAction': IDecoratorModelOptions;
    'a-base:atomClass': IDecoratorModelOptions;
    'a-base:atomLabel': IDecoratorModelOptions;
    'a-base:atomLabelRef': IDecoratorModelOptions;
    'a-base:atomStar': IDecoratorModelOptions;
    'a-base:category': IDecoratorModelOptions;
    'a-base:comment': IDecoratorModelOptions;
    'a-base:commentHeart': IDecoratorModelOptions;
    'a-base:commentView': IDecoratorModelOptions;
    'a-base:label': IDecoratorModelOptions;
    'a-base:resource': IDecoratorModelOptions;
    'a-base:resourceLocale': IDecoratorModelOptions;
    'a-base:resourceRole': IDecoratorModelOptions;
    'a-base:role': IDecoratorModelOptions;
    'a-base:roleExpand': IDecoratorModelOptions;
    'a-base:roleFieldsRight': IDecoratorModelOptions;
    'a-base:roleInc': IDecoratorModelOptions;
    'a-base:roleIncRef': IDecoratorModelOptions;
    'a-base:roleRef': IDecoratorModelOptions;
    'a-base:roleRight': IDecoratorModelOptions;
    'a-base:roleRightRef': IDecoratorModelOptions;
    'a-base:tag': IDecoratorModelOptions;
    'a-base:tagRef': IDecoratorModelOptions;
    'a-base:user': IDecoratorModelOptions;
    'a-base:userAgent': IDecoratorModelOptions;
    'a-base:userRole': IDecoratorModelOptions;
    'a-base:userRoleIncRef': IDecoratorModelOptions;
    'a-base:userRoleRef': IDecoratorModelOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface ModelAtom {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelAtomAction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelAtomClass {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelAtomLabel {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelAtomLabelRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelAtomStar {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelCategory {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelComment {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelCommentHeart {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelCommentView {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelLabel {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelResource {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelResourceLocale {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelResourceRole {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRole {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleExpand {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleFieldsRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleInc {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleIncRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelRoleRightRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelTag {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelTagRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelUserAgent {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelUserRole {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelUserRoleIncRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ModelUserRoleRef {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** model: end */
/** model: begin */
import { ModelAtom } from '../model/atom.js';
import { ModelAtomAction } from '../model/atomAction.js';
import { ModelAtomClass } from '../model/atomClass.js';
import { ModelAtomLabel } from '../model/atomLabel.js';
import { ModelAtomLabelRef } from '../model/atomLabelRef.js';
import { ModelAtomStar } from '../model/atomStar.js';
import { ModelCategory } from '../model/category.js';
import { ModelComment } from '../model/comment.js';
import { ModelCommentHeart } from '../model/commentHeart.js';
import { ModelCommentView } from '../model/commentView.js';
import { ModelLabel } from '../model/label.js';
import { ModelResource } from '../model/resource.js';
import { ModelResourceLocale } from '../model/resourceLocale.js';
import { ModelResourceRole } from '../model/resourceRole.js';
import { ModelRole } from '../model/role.js';
import { ModelRoleExpand } from '../model/roleExpand.js';
import { ModelRoleFieldsRight } from '../model/roleFieldsRight.js';
import { ModelRoleInc } from '../model/roleInc.js';
import { ModelRoleIncRef } from '../model/roleIncRef.js';
import { ModelRoleRef } from '../model/roleRef.js';
import { ModelRoleRight } from '../model/roleRight.js';
import { ModelRoleRightRef } from '../model/roleRightRef.js';
import { ModelTag } from '../model/tag.js';
import { ModelTagRef } from '../model/tagRef.js';
import { ModelUser } from '../model/user.js';
import { ModelUserAgent } from '../model/userAgent.js';
import { ModelUserRole } from '../model/userRole.js';
import { ModelUserRoleIncRef } from '../model/userRoleIncRef.js';
import { ModelUserRoleRef } from '../model/userRoleRef.js';
export interface IModuleModel {
  atom: ModelAtom;
  atomAction: ModelAtomAction;
  atomClass: ModelAtomClass;
  atomLabel: ModelAtomLabel;
  atomLabelRef: ModelAtomLabelRef;
  atomStar: ModelAtomStar;
  category: ModelCategory;
  comment: ModelComment;
  commentHeart: ModelCommentHeart;
  commentView: ModelCommentView;
  label: ModelLabel;
  resource: ModelResource;
  resourceLocale: ModelResourceLocale;
  resourceRole: ModelResourceRole;
  role: ModelRole;
  roleExpand: ModelRoleExpand;
  roleFieldsRight: ModelRoleFieldsRight;
  roleInc: ModelRoleInc;
  roleIncRef: ModelRoleIncRef;
  roleRef: ModelRoleRef;
  roleRight: ModelRoleRight;
  roleRightRef: ModelRoleRightRef;
  tag: ModelTag;
  tagRef: ModelTagRef;
  user: ModelUser;
  userAgent: ModelUserAgent;
  userRole: ModelUserRole;
  userRoleIncRef: ModelUserRoleIncRef;
  userRoleRef: ModelUserRoleRef;
}
/** model: end */
/** summerCache: begin */
export * from '../bean/summerCache.atomClassInner.js';
export * from '../bean/summerCache.roleParentsOfUser.js';
export * from '../bean/summerCache.roleScopesMineOfUser.js';
export * from '../bean/summerCache.roleScopesOfRole.js';
export * from '../bean/summerCache.roleScopesOfUser.js';
export * from '../bean/summerCache.roleWhosOfAtomClassAction.js';

import { IDecoratorSummerCacheOptions } from 'vona-module-a-summer';
declare module 'vona-module-a-summer' {
  export interface ISummerCacheRecord {
    'a-base:atomClassInner': IDecoratorSummerCacheOptions;
    'a-base:roleParentsOfUser': IDecoratorSummerCacheOptions;
    'a-base:roleScopesMineOfUser': IDecoratorSummerCacheOptions;
    'a-base:roleScopesOfRole': IDecoratorSummerCacheOptions;
    'a-base:roleScopesOfUser': IDecoratorSummerCacheOptions;
    'a-base:roleWhosOfAtomClassAction': IDecoratorSummerCacheOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface SummerCacheAtomClassInner {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface SummerCacheRoleParentsOfUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface SummerCacheRoleScopesMineOfUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface SummerCacheRoleScopesOfRole {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface SummerCacheRoleScopesOfUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface SummerCacheRoleWhosOfAtomClassAction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** summerCache: end */
/** summerCache: begin */
import { SummerCacheAtomClassInner } from '../bean/summerCache.atomClassInner.js';
import { SummerCacheRoleParentsOfUser } from '../bean/summerCache.roleParentsOfUser.js';
import { SummerCacheRoleScopesMineOfUser } from '../bean/summerCache.roleScopesMineOfUser.js';
import { SummerCacheRoleScopesOfRole } from '../bean/summerCache.roleScopesOfRole.js';
import { SummerCacheRoleScopesOfUser } from '../bean/summerCache.roleScopesOfUser.js';
import { SummerCacheRoleWhosOfAtomClassAction } from '../bean/summerCache.roleWhosOfAtomClassAction.js';
export interface IModuleSummerCache {
  atomClassInner: SummerCacheAtomClassInner;
  roleParentsOfUser: SummerCacheRoleParentsOfUser;
  roleScopesMineOfUser: SummerCacheRoleScopesMineOfUser;
  roleScopesOfRole: SummerCacheRoleScopesOfRole;
  roleScopesOfUser: SummerCacheRoleScopesOfUser;
  roleWhosOfAtomClassAction: SummerCacheRoleWhosOfAtomClassAction;
}
/** summerCache: end */
/** atom: begin */
export * from '../atom/resource.js';
export * from '../atom/role.js';
export * from '../atom/roleFieldsRight.js';
export * from '../atom/roleFieldsRightSpread.js';
export * from '../atom/roleResourceRight.js';
export * from '../atom/roleResourceRightSpread.js';
export * from '../atom/roleRight.js';
export * from '../atom/roleRightSpread.js';
export * from '../atom/user.js';
export * from '../atom/userAtomRight.js';
export * from '../atom/userFieldsRight.js';
export * from '../atom/userResourceRight.js';

import 'vona';
declare module 'vona' {
  export interface IAtomRecord {
    'a-base:resource': never;
    'a-base:role': never;
    'a-base:roleFieldsRight': never;
    'a-base:roleFieldsRightSpread': never;
    'a-base:roleResourceRight': never;
    'a-base:roleResourceRightSpread': never;
    'a-base:roleRight': never;
    'a-base:roleRightSpread': never;
    'a-base:user': never;
    'a-base:userAtomRight': never;
    'a-base:userFieldsRight': never;
    'a-base:userResourceRight': never;
  }
}
declare module 'vona-module-a-base' {
  export interface AtomResource {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRole {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRoleFieldsRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRoleFieldsRightSpread {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRoleResourceRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRoleResourceRightSpread {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRoleRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomRoleRightSpread {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomUserAtomRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomUserFieldsRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface AtomUserResourceRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** atom: end */
/** middleware: begin */
export * from '../bean/middleware.auth.js';
export * from '../bean/middleware.authOpen.js';
export * from '../bean/middleware.httpLog.js';
export * from '../bean/middleware.inner.js';
export * from '../bean/middleware.jsonp.js';
export * from '../bean/middleware.right.js';
export * from '../bean/middleware.test.js';
export * from '../bean/middleware.transaction.js';

import 'vona';
declare module 'vona-module-a-aspect' {
  export interface IMiddlewareRecordLocal {
    'a-base:auth': never;
    'a-base:authOpen': never;
    'a-base:httpLog': never;
    'a-base:inner': never;
    'a-base:jsonp': never;
    'a-base:right': never;
    'a-base:test': never;
    'a-base:transaction': never;
  }
}
declare module 'vona-module-a-base' {
  export interface MiddlewareAuth {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareAuthOpen {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareHttpLog {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareInner {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareJsonp {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareTest {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MiddlewareTransaction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** middleware: end */
/** aop: begin */
export * from '../bean/aop.category.js';

import { IDecoratorAopOptions } from 'vona-module-a-aspect';
declare module 'vona-module-a-aspect' {
  export interface IAopRecord {
    'a-base:category': IDecoratorAopOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface AopCategory {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** aop: end */
/** bean: begin */
export * from '../bean/bean.atom.js';
export * from '../bean/bean.atomAction.js';
export * from '../bean/bean.atomBase_.js';
export * from '../bean/bean.atomClass.js';
export * from '../bean/bean.atomRightAux.js';
export * from '../bean/bean.atomStage.js';
export * from '../bean/bean.atomState.js';
export * from '../bean/bean.atomStatic.js';
export * from '../bean/bean.auth.js';
export * from '../bean/bean.base.js';
export * from '../bean/bean.bodyCrypto.js';
export * from '../bean/bean.category.js';
export * from '../bean/bean.formAction.js';
export * from '../bean/bean.resource.js';
export * from '../bean/bean.role.js';
export * from '../bean/bean.stash.js';
export * from '../bean/bean.tag.js';
export * from '../bean/bean.user.js';
export * from '../bean/bean.util.js';

import 'vona';
declare module 'vona' {}
declare module 'vona-module-a-base' {
  export interface BeanAtom {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAtomAction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAtomClass {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAtomRightAux {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAtomStage {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAtomState {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAtomStatic {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanAuth {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanBase {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanBodyCrypto {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanCategory {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanFormAction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanResource {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanRole {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanStash {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanTag {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface BeanUtil {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** bean: end */
/** bean: begin */
import { BeanAtom } from '../bean/bean.atom.js';
import { BeanAtomAction } from '../bean/bean.atomAction.js';
import { BeanAtomClass } from '../bean/bean.atomClass.js';
import { BeanAtomRightAux } from '../bean/bean.atomRightAux.js';
import { BeanAtomStage } from '../bean/bean.atomStage.js';
import { BeanAtomState } from '../bean/bean.atomState.js';
import { BeanAtomStatic } from '../bean/bean.atomStatic.js';
import { BeanAuth } from '../bean/bean.auth.js';
import { BeanBase } from '../bean/bean.base.js';
import { BeanBodyCrypto } from '../bean/bean.bodyCrypto.js';
import { BeanCategory } from '../bean/bean.category.js';
import { BeanFormAction } from '../bean/bean.formAction.js';
import { BeanResource } from '../bean/bean.resource.js';
import { BeanRole } from '../bean/bean.role.js';
import { BeanStash } from '../bean/bean.stash.js';
import { BeanTag } from '../bean/bean.tag.js';
import { BeanUser } from '../bean/bean.user.js';
import { BeanUtil } from '../bean/bean.util.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    atom: BeanAtom;
    atomAction: BeanAtomAction;
    atomClass: BeanAtomClass;
    atomRightAux: BeanAtomRightAux;
    atomStage: BeanAtomStage;
    atomState: BeanAtomState;
    atomStatic: BeanAtomStatic;
    auth: BeanAuth;
    base: BeanBase;
    bodyCrypto: BeanBodyCrypto;
    category: BeanCategory;
    formAction: BeanFormAction;
    resource: BeanResource;
    role: BeanRole;
    stash: BeanStash;
    tag: BeanTag;
    user: BeanUser;
    util: BeanUtil;
  }
}
/** bean: end */
/** event: begin */
export * from '../bean/event.accountMigration.js';
export * from '../bean/event.loginInfo.js';
export * from '../bean/event.userAdd.js';
export * from '../bean/event.userVerify.js';

import { IDecoratorEventOptions } from 'vona-module-a-event';
declare module 'vona-module-a-event' {
  export interface IEventRecord {
    'a-base:accountMigration': IDecoratorEventOptions;
    'a-base:loginInfo': IDecoratorEventOptions;
    'a-base:userAdd': IDecoratorEventOptions;
    'a-base:userVerify': IDecoratorEventOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface EventAccountMigration {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface EventLoginInfo {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface EventUserAdd {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface EventUserVerify {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** event: end */
/** event: begin */
import { EventAccountMigration } from '../bean/event.accountMigration.js';
import { EventLoginInfo } from '../bean/event.loginInfo.js';
import { EventUserAdd } from '../bean/event.userAdd.js';
import { EventUserVerify } from '../bean/event.userVerify.js';
export interface IModuleEvent {
  accountMigration: EventAccountMigration;
  loginInfo: EventLoginInfo;
  userAdd: EventUserAdd;
  userVerify: EventUserVerify;
}
/** event: end */
/** meta: begin */
export * from '../bean/meta.redlock.js';
export * from '../bean/meta.status.js';

import 'vona';
declare module 'vona' {
  export interface IMetaRecord {
    'a-base:redlock': never;
    'a-base:status': never;
  }
}
declare module 'vona-module-a-base' {
  export interface MetaRedlock {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface MetaStatus {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** meta: end */
/** meta status: begin */
import { MetaStatus } from '../bean/meta.status.js';
/** meta status: end */
/** meta redlock: begin */
import { MetaRedlock } from '../bean/meta.redlock.js';
/** meta redlock: end */
/** queue: begin */
export * from '../bean/queue.roleBuild.js';

import { IDecoratorQueueOptions } from 'vona-module-a-queue';
declare module 'vona-module-a-queue' {
  export interface IQueueRecord {
    'a-base:roleBuild': IDecoratorQueueOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface QueueRoleBuild {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** queue: end */
/** queue: begin */
import { QueueRoleBuild } from '../bean/queue.roleBuild.js';
export interface IModuleQueue {
  roleBuild: QueueRoleBuild;
}
/** queue: end */
/** socketConnection: begin */
export * from '../bean/socketConnection.auth.js';
import { ISocketConnectionOptionsAuth } from '../bean/socketConnection.auth.js';
import 'vona';
declare module 'vona-module-a-socket' {
  export interface ISocketConnectionRecord {
    'a-base:auth': ISocketConnectionOptionsAuth;
  }
}
declare module 'vona-module-a-base' {
  export interface SocketConnectionAuth {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** socketConnection: end */
/** startup: begin */
export * from '../bean/startup.checkResourceLocales.js';
export * from '../bean/startup.checkViewHistoryRight.js';
export * from '../bean/startup.loadAtomStatics.js';

import { IDecoratorStartupOptions } from 'vona-module-a-startup';
declare module 'vona-module-a-startup' {
  export interface IStartupRecord {
    'a-base:checkResourceLocales': IDecoratorStartupOptions;
    'a-base:checkViewHistoryRight': IDecoratorStartupOptions;
    'a-base:loadAtomStatics': IDecoratorStartupOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface StartupCheckResourceLocales {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface StartupCheckViewHistoryRight {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface StartupLoadAtomStatics {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** startup: end */
/** service: begin */
export * from '../service/atom.js';
export * from '../service/atomAction.js';
export * from '../service/atomClass.js';
export * from '../service/atomState.js';
export * from '../service/auth.js';
export * from '../service/base.js';
export * from '../service/category.js';
export * from '../service/comment.js';
export * from '../service/jwt.js';
export * from '../service/layoutConfig.js';
export * from '../service/procedure.js';
export * from '../service/resource.js';
export * from '../service/stash.js';
export * from '../service/tag.js';
export * from '../service/user.js';
export * from '../service/util.js';

import 'vona';
declare module 'vona' {
  export interface IServiceRecord {
    'a-base:atom': never;
    'a-base:atomAction': never;
    'a-base:atomClass': never;
    'a-base:atomState': never;
    'a-base:auth': never;
    'a-base:base': never;
    'a-base:category': never;
    'a-base:comment': never;
    'a-base:jwt': never;
    'a-base:layoutConfig': never;
    'a-base:procedure': never;
    'a-base:resource': never;
    'a-base:stash': never;
    'a-base:tag': never;
    'a-base:user': never;
    'a-base:util': never;
  }
}
declare module 'vona-module-a-base' {
  export interface ServiceAtom {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceAtomAction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceAtomClass {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceAtomState {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceBase {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceCategory {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceComment {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceJwt {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceLayoutConfig {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceProcedure {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceResource {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceStash {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceTag {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ServiceUtil {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** service: end */
/** service: begin */
import { ServiceAtom } from '../service/atom.js';
import { ServiceAtomAction } from '../service/atomAction.js';
import { ServiceAtomClass } from '../service/atomClass.js';
import { ServiceAtomState } from '../service/atomState.js';
import { ServiceAuth } from '../service/auth.js';
import { ServiceBase } from '../service/base.js';
import { ServiceCategory } from '../service/category.js';
import { ServiceComment } from '../service/comment.js';
import { ServiceJwt } from '../service/jwt.js';
import { ServiceLayoutConfig } from '../service/layoutConfig.js';
import { ServiceProcedure } from '../service/procedure.js';
import { ServiceResource } from '../service/resource.js';
import { ServiceStash } from '../service/stash.js';
import { ServiceTag } from '../service/tag.js';
import { ServiceUser } from '../service/user.js';
import { ServiceUtil } from '../service/util.js';
export interface IModuleService {
  atom: ServiceAtom;
  atomAction: ServiceAtomAction;
  atomClass: ServiceAtomClass;
  atomState: ServiceAtomState;
  auth: ServiceAuth;
  base: ServiceBase;
  category: ServiceCategory;
  comment: ServiceComment;
  jwt: ServiceJwt;
  layoutConfig: ServiceLayoutConfig;
  procedure: ServiceProcedure;
  resource: ServiceResource;
  stash: ServiceStash;
  tag: ServiceTag;
  user: ServiceUser;
  util: ServiceUtil;
}
/** service: end */
/** service: begin */
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGeneral {
    'a-base.service.atom': ServiceAtom;
    'a-base.service.atomAction': ServiceAtomAction;
    'a-base.service.atomClass': ServiceAtomClass;
    'a-base.service.atomState': ServiceAtomState;
    'a-base.service.auth': ServiceAuth;
    'a-base.service.base': ServiceBase;
    'a-base.service.category': ServiceCategory;
    'a-base.service.comment': ServiceComment;
    'a-base.service.jwt': ServiceJwt;
    'a-base.service.layoutConfig': ServiceLayoutConfig;
    'a-base.service.procedure': ServiceProcedure;
    'a-base.service.resource': ServiceResource;
    'a-base.service.stash': ServiceStash;
    'a-base.service.tag': ServiceTag;
    'a-base.service.user': ServiceUser;
    'a-base.service.util': ServiceUtil;
  }
}
/** service: end */
/** controller: begin */
export * from '../controller/atom.js';
export * from '../controller/atomAction.js';
export * from '../controller/atomClass.js';
export * from '../controller/atomState.js';
export * from '../controller/auth.js';
export * from '../controller/base.js';
export * from '../controller/category.js';
export * from '../controller/comment.js';
export * from '../controller/jwt.js';
export * from '../controller/layoutConfig.js';
export * from '../controller/resource.js';
export * from '../controller/tag.js';
export * from '../controller/user.js';
export * from '../controller/util.js';

import { IDecoratorControllerOptions } from 'vona-module-a-web';
declare module 'vona-module-a-web' {
  export interface IControllerRecord {
    'a-base:atom': IDecoratorControllerOptions;
    'a-base:atomAction': IDecoratorControllerOptions;
    'a-base:atomClass': IDecoratorControllerOptions;
    'a-base:atomState': IDecoratorControllerOptions;
    'a-base:auth': IDecoratorControllerOptions;
    'a-base:base': IDecoratorControllerOptions;
    'a-base:category': IDecoratorControllerOptions;
    'a-base:comment': IDecoratorControllerOptions;
    'a-base:jwt': IDecoratorControllerOptions;
    'a-base:layoutConfig': IDecoratorControllerOptions;
    'a-base:resource': IDecoratorControllerOptions;
    'a-base:tag': IDecoratorControllerOptions;
    'a-base:user': IDecoratorControllerOptions;
    'a-base:util': IDecoratorControllerOptions;
  }
}
declare module 'vona-module-a-base' {
  export interface ControllerAtom {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerAtomAction {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerAtomClass {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerAtomState {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerAuth {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerBase {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerCategory {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerComment {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerJwt {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerLayoutConfig {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerResource {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerTag {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerUser {
    /** @internal */
    get scope(): ScopeModuleABase;
  }

  export interface ControllerUtil {
    /** @internal */
    get scope(): ScopeModuleABase;
  }
}
/** controller: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** constant: begin */
export * from '../config/constants.js';
import { constants } from '../config/constants.js';
/** constant: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** error: begin */
export * from '../config/errors.js';
import { Errors } from '../config/errors.js';
/** error: end */
/** scope: begin */
import {
  BeanScopeBase,
  Scope,
  TypeModuleBean,
  BeanScopeUtil,
  TypeModuleConfig,
  TypeModuleErrors,
  TypeModuleLocales,
  TypeLocaleBase,
  TypeModuleConstants,
} from 'vona';

@Scope()
export class ScopeModuleABase extends BeanScopeBase {}

export interface ScopeModuleABase {
  _bean: TypeModuleBean;
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  error: TypeModuleErrors<typeof Errors>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  constant: TypeModuleConstants<typeof constants>;
  entity: IModuleEntity;
  model: IModuleModel;
  summerCache: IModuleSummerCache;
  event: IModuleEvent;
  status: MetaStatus;
  redlock: MetaRedlock;
  queue: IModuleQueue;
  service: IModuleService;
}

import 'vona';
declare module 'vona' {
  export interface IBeanScopeRecord {
    'a-base': ScopeModuleABase;
  }

  export interface IBeanScopeContainer {
    base: ScopeModuleABase;
  }

  export interface IBeanScopeConfig {
    'a-base': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-base': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-base:${K}` {
  return `a-base:${key}`;
}
/** scope: end */
