/** beans: begin */
export * from '../bean/aop.category.js';
export * from '../bean/bean.atom.js';
export * from '../bean/bean.atomAction.js';
export * from '../bean/bean.atomBase.js';
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
export * from '../bean/middleware.auth.js';
export * from '../bean/middleware.authOpen.js';
export * from '../bean/middleware.gate.js';
export * from '../bean/middleware.httpLog.js';
export * from '../bean/middleware.inner.js';
export * from '../bean/middleware.io.connectionAuth.js';
export * from '../bean/middleware.jsonp.js';
export * from '../bean/middleware.right.js';
export * from '../bean/middleware.test.js';
export * from '../bean/middleware.transaction.js';
export * from '../bean/queue.roleBuild.js';
export * from '../bean/queue.schedule.js';
export * from '../bean/startup.checkResourceLocales.js';
export * from '../bean/startup.checkViewHistoryRight.js';
export * from '../bean/startup.loadAtomStatics.js';
export * from '../bean/startup.loadSchedules.js';
export * from '../bean/startup.outputHomeRoute.js';
export * from '../bean/stats.draftsCommon.js';
export * from '../bean/stats.draftsFlowing.js';
export * from '../bean/stats.labels.js';
export * from '../bean/stats.stars.js';
export * from '../bean/stats.starsLabels.js';
export * from '../bean/summer.cache.atomClassInner.js';
export * from '../bean/summer.cache.roleParentsOfUser.js';
export * from '../bean/summer.cache.roleScopesMineOfUser.js';
export * from '../bean/summer.cache.roleScopesOfRole.js';
export * from '../bean/summer.cache.roleScopesOfUser.js';
export * from '../bean/summer.cache.roleWhosOfAtomClassAction.js';
export * from '../bean/version.manager.js';
import { AopCategory } from '../bean/aop.category.js';
import { BeanAtom } from '../bean/bean.atom.js';
import { BeanAtomAction } from '../bean/bean.atomAction.js';
import { BeanAtomBase } from '../bean/bean.atomBase.js';
import { BeanAtomClass } from '../bean/bean.atomClass.js';
import { BeanAtomRightAux } from '../bean/bean.atomRightAux.js';
import { BeanAtomStage } from '../bean/bean.atomStage.js';
import { BeanAtomState } from '../bean/bean.atomState.js';
import { BeanAtomStatic } from '../bean/bean.atomStatic.js';
import { BeanAuth } from '../bean/bean.auth.js';
import { BeanBase2 } from '../bean/bean.base.js';
import { BeanBodyCrypto } from '../bean/bean.bodyCrypto.js';
import { BeanCategory } from '../bean/bean.category.js';
import { BeanFormAction } from '../bean/bean.formAction.js';
import { BeanResource } from '../bean/bean.resource.js';
import { BeanRole } from '../bean/bean.role.js';
import { BeanStash } from '../bean/bean.stash.js';
import { BeanTag } from '../bean/bean.tag.js';
import { BeanUser } from '../bean/bean.user.js';
import { BeanUtil } from '../bean/bean.util.js';
import { MiddlewareAuth } from '../bean/middleware.auth.js';
import { MiddlewareAuthOpen } from '../bean/middleware.authOpen.js';
import { MiddlewareGate } from '../bean/middleware.gate.js';
import { MiddlewareHttpLog } from '../bean/middleware.httpLog.js';
import { MiddlewareInner } from '../bean/middleware.inner.js';
import { MiddlewareIoConnectionAuth } from '../bean/middleware.io.connectionAuth.js';
import { MiddlewareJsonp } from '../bean/middleware.jsonp.js';
import { MiddlewareRight } from '../bean/middleware.right.js';
import { MiddlewareTest } from '../bean/middleware.test.js';
import { MiddlewareTransaction } from '../bean/middleware.transaction.js';
import { QueueRoleBuild } from '../bean/queue.roleBuild.js';
import { QueueSchedule } from '../bean/queue.schedule.js';
import { StartupCheckResourceLocales } from '../bean/startup.checkResourceLocales.js';
import { StartupCheckViewHistoryRight } from '../bean/startup.checkViewHistoryRight.js';
import { StartupLoadAtomStatics } from '../bean/startup.loadAtomStatics.js';
import { StartupLoadSchedules } from '../bean/startup.loadSchedules.js';
import { StartupOutputHomeRoute } from '../bean/startup.outputHomeRoute.js';
import { StatsDraftsCommon } from '../bean/stats.draftsCommon.js';
import { StatsDraftsFlowing } from '../bean/stats.draftsFlowing.js';
import { StatsLabels } from '../bean/stats.labels.js';
import { StatsStars } from '../bean/stats.stars.js';
import { StatsStarsLabels } from '../bean/stats.starsLabels.js';
import { SummerCacheAtomClassInner } from '../bean/summer.cache.atomClassInner.js';
import { SummerCacheRoleParentsOfUser } from '../bean/summer.cache.roleParentsOfUser.js';
import { SummerCacheRoleScopesMineOfUser } from '../bean/summer.cache.roleScopesMineOfUser.js';
import { SummerCacheRoleScopesOfRole } from '../bean/summer.cache.roleScopesOfRole.js';
import { SummerCacheRoleScopesOfUser } from '../bean/summer.cache.roleScopesOfUser.js';
import { SummerCacheRoleWhosOfAtomClassAction } from '../bean/summer.cache.roleWhosOfAtomClassAction.js';
import { VersionManager } from '../bean/version.manager.js';
import 'vona';
declare module 'vona' {
  export interface IBeanRecordGlobal {
    atom: BeanAtom;
    atomAction: BeanAtomAction;
    atomBase: BeanAtomBase;
    atomClass: BeanAtomClass;
    atomRightAux: BeanAtomRightAux;
    atomStage: BeanAtomStage;
    atomState: BeanAtomState;
    atomStatic: BeanAtomStatic;
    auth: BeanAuth;
    base: BeanBase2;
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

  export interface IBeanRecordGeneral {
    'a-base.aop.category': AopCategory;
    'a-base.middleware.auth': MiddlewareAuth;
    'a-base.middleware.authOpen': MiddlewareAuthOpen;
    'a-base.middleware.gate': MiddlewareGate;
    'a-base.middleware.httpLog': MiddlewareHttpLog;
    'a-base.middleware.inner': MiddlewareInner;
    'a-base.middleware.io.connectionAuth': MiddlewareIoConnectionAuth;
    'a-base.middleware.jsonp': MiddlewareJsonp;
    'a-base.middleware.right': MiddlewareRight;
    'a-base.middleware.test': MiddlewareTest;
    'a-base.middleware.transaction': MiddlewareTransaction;
    'a-base.queue.roleBuild': QueueRoleBuild;
    'a-base.queue.schedule': QueueSchedule;
    'a-base.startup.checkResourceLocales': StartupCheckResourceLocales;
    'a-base.startup.checkViewHistoryRight': StartupCheckViewHistoryRight;
    'a-base.startup.loadAtomStatics': StartupLoadAtomStatics;
    'a-base.startup.loadSchedules': StartupLoadSchedules;
    'a-base.startup.outputHomeRoute': StartupOutputHomeRoute;
    'a-base.stats.draftsCommon': StatsDraftsCommon;
    'a-base.stats.draftsFlowing': StatsDraftsFlowing;
    'a-base.stats.labels': StatsLabels;
    'a-base.stats.stars': StatsStars;
    'a-base.stats.starsLabels': StatsStarsLabels;
    'a-base.summer.cache.atomClassInner': SummerCacheAtomClassInner;
    'a-base.summer.cache.roleParentsOfUser': SummerCacheRoleParentsOfUser;
    'a-base.summer.cache.roleScopesMineOfUser': SummerCacheRoleScopesMineOfUser;
    'a-base.summer.cache.roleScopesOfRole': SummerCacheRoleScopesOfRole;
    'a-base.summer.cache.roleScopesOfUser': SummerCacheRoleScopesOfUser;
    'a-base.summer.cache.roleWhosOfAtomClassAction': SummerCacheRoleWhosOfAtomClassAction;
    'a-base.version.manager': VersionManager;
  }
}
/** beans: end */
/** atoms: begin */
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
/** atoms: end */
/** controllers: begin */
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
import { ControllerAtom } from '../controller/atom.js';
import { ControllerAtomAction } from '../controller/atomAction.js';
import { ControllerAtomClass } from '../controller/atomClass.js';
import { ControllerAtomState } from '../controller/atomState.js';
import { ControllerAuth } from '../controller/auth.js';
import { ControllerBase } from '../controller/base.js';
import { ControllerCategory } from '../controller/category.js';
import { ControllerComment } from '../controller/comment.js';
import { ControllerJwt } from '../controller/jwt.js';
import { ControllerLayoutConfig } from '../controller/layoutConfig.js';
import { ControllerResource } from '../controller/resource.js';
import { ControllerTag } from '../controller/tag.js';
import { ControllerUser } from '../controller/user.js';
import { ControllerUtil } from '../controller/util.js';
export const controllers = {
  atom: ControllerAtom,
  atomAction: ControllerAtomAction,
  atomClass: ControllerAtomClass,
  atomState: ControllerAtomState,
  auth: ControllerAuth,
  base: ControllerBase,
  category: ControllerCategory,
  comment: ControllerComment,
  jwt: ControllerJwt,
  layoutConfig: ControllerLayoutConfig,
  resource: ControllerResource,
  tag: ControllerTag,
  user: ControllerUser,
  util: ControllerUtil,
};
/** controllers: end */
/** entities: begin */
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
/** entities: end */
/** models: begin */
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
/** models: end */
/** services: begin */
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
/** services: end */
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'vona';

@Scope()
export class ScopeModuleABase extends BeanScopeBase {}

export interface ScopeModuleABase
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants,
    IModuleService,
    IModuleModel
  > {}

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
/** scope: end */
