import versionManager from './bean/version.manager.js';
import atomResource from './bean/atom.resource.js';
import atomRole from './bean/atom.role.js';
import atomRoleRight from './bean/atom.roleRight.js';
import atomRoleRightSpread from './bean/atom.roleRightSpread.js';
import atomRoleResourceRight from './bean/atom.roleResourceRight.js';
import atomRoleResourceRightSpread from './bean/atom.roleResourceRightSpread.js';
import atomRoleFieldsRight from './bean/atom.roleFieldsRight.js';
import atomRoleFieldsRightSpread from './bean/atom.roleFieldsRightSpread.js';
import atomUser from './bean/atom.user.js';
import atomUserAtomRight from './bean/atom.userAtomRight.js';
import atomUserResourceRight from './bean/atom.userResourceRight.js';
import atomUserFieldsRight from './bean/atom.userFieldsRight.js';
import localProcedure from './bean/local.procedure.js';
import localStash from './bean/local.stash.js';
import queueSchedule from './bean/queue.schedule.js';
import queueRoleBuild from './bean/queue.roleBuild.js';
import startupLoadSchedules from './bean/startup.loadSchedules.js';
import startupLoadAtomStatics from './bean/startup.loadAtomStatics.js';
import startupCheckResourceLocales from './bean/startup.checkResourceLocales.js';
import startupCheckViewHistoryRight from './bean/startup.checkViewHistoryRight.js';
import middlewareInner from './bean/middleware.inner.js';
import middlewareTest from './bean/middleware.test.js';
import middlewareTransaction from './bean/middleware.transaction.js';
import middlewareGate from './bean/middleware.gate.js';
import middlewareCors from './bean/middleware.cors.js';
import middlewareAuth from './bean/middleware.auth.js';
import middlewareAuthOpen from './bean/middleware.authOpen.js';
import middlewareRight from './bean/middleware.right.js';
import middlewareJsonp from './bean/middleware.jsonp.js';
import middlewareHttpLog from './bean/middleware.httpLog.js';
import middlewareIOConnectionAuth from './bean/middleware.io.connectionAuth.js';
import beanAtomBase from './bean/bean.atomBase.js';
import beanAtom from './bean/bean.atom.js';
import beanAtomAction from './bean/bean.atomAction.js';
import beanAtomClass from './bean/bean.atomClass.js';
import beanAtomRightAux from './bean/bean.atomRightAux.js';
import beanAtomStatic from './bean/bean.atomStatic.js';
import beanAuth from './bean/bean.auth.js';
import beanBase from './bean/bean.base.js';
import beanResource from './bean/bean.resource.js';
import beanRole from './bean/bean.role.js';
import beanUser from './bean/bean.user.js';
import beanUtil from './bean/bean.util.js';
import beanCategory from './bean/bean.category.js';
import beanTag from './bean/bean.tag.js';
import beanBodyCrypto from './bean/bean.bodyCrypto.js';
import beanStash from './bean/bean.stash.js';
import beanAtomStage from './bean/bean.atomStage.js';
import beanAtomState from './bean/bean.atomState.js';
import beanFormAction from './bean/bean.formAction.js';
import statsDraftsCommon from './bean/stats.draftsCommon.js';
import statsStars from './bean/stats.stars.js';
import statsLabels from './bean/stats.labels.js';
import statsStarsLabels from './bean/stats.starsLabels.js';
import summerCacheAtomClassInner from './bean/summer.cache.atomClassInner.js';
import summerCacheRoleScopesOfUser from './bean/summer.cache.roleScopesOfUser.js';
import summerCacheRoleScopesOfRole from './bean/summer.cache.roleScopesOfRole.js';
import summerCacheRoleScopesMineOfUser from './bean/summer.cache.roleScopesMineOfUser.js';
import summerCacheRoleWhosOfAtomClassAction from './bean/summer.cache.roleWhosOfAtomClassAction.js';
import summerCacheRoleParentsOfUser from './bean/summer.cache.roleParentsOfUser.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.resource': {
    bean: atomResource,
  },
  'atom.role': {
    bean: atomRole,
  },
  'atom.roleRight': {
    bean: atomRoleRight,
  },
  'atom.roleRightSpread': {
    bean: atomRoleRightSpread,
  },
  'atom.roleResourceRight': {
    bean: atomRoleResourceRight,
  },
  'atom.roleResourceRightSpread': {
    bean: atomRoleResourceRightSpread,
  },
  'atom.roleFieldsRight': {
    bean: atomRoleFieldsRight,
  },
  'atom.roleFieldsRightSpread': {
    bean: atomRoleFieldsRightSpread,
  },
  'atom.user': {
    bean: atomUser,
  },
  'atom.userAtomRight': {
    bean: atomUserAtomRight,
  },
  'atom.userResourceRight': {
    bean: atomUserResourceRight,
  },
  'atom.userFieldsRight': {
    bean: atomUserFieldsRight,
  },
  // local
  'local.procedure': {
    bean: localProcedure,
  },
  'local.stash': {
    bean: localStash,
  },
  // queue
  'queue.schedule': {
    bean: queueSchedule,
  },
  'queue.roleBuild': {
    bean: queueRoleBuild,
  },
  // startup
  'startup.loadSchedules': {
    bean: startupLoadSchedules,
  },
  'startup.loadAtomStatics': {
    bean: startupLoadAtomStatics,
  },
  'startup.checkResourceLocales': {
    bean: startupCheckResourceLocales,
  },
  'startup.checkViewHistoryRight': {
    bean: startupCheckViewHistoryRight,
  },
  // middleware
  'middleware.inner': {
    bean: middlewareInner,
  },
  'middleware.test': {
    bean: middlewareTest,
  },
  'middleware.transaction': {
    bean: middlewareTransaction,
  },
  'middleware.gate': {
    bean: middlewareGate,
  },
  'middleware.cors': {
    bean: middlewareCors,
  },
  'middleware.auth': {
    bean: middlewareAuth,
  },
  'middleware.authOpen': {
    bean: middlewareAuthOpen,
  },
  'middleware.right': {
    bean: middlewareRight,
  },
  'middleware.jsonp': {
    bean: middlewareJsonp,
  },
  'middleware.httpLog': {
    bean: middlewareHttpLog,
  },
  'middleware.io.connectionAuth': {
    bean: middlewareIOConnectionAuth,
  },
  // global
  atomBase: {
    bean: beanAtomBase,
    global: true,
  },
  atom: {
    bean: beanAtom,
    global: true,
  },
  atomAction: {
    bean: beanAtomAction,
    global: true,
  },
  atomClass: {
    bean: beanAtomClass,
    global: true,
  },
  atomRightAux: {
    bean: beanAtomRightAux,
    global: true,
  },
  atomStatic: {
    bean: beanAtomStatic,
    global: true,
  },
  auth: {
    bean: beanAuth,
    global: true,
  },
  base: {
    bean: beanBase,
    global: true,
  },
  resource: {
    bean: beanResource,
    global: true,
  },
  role: {
    bean: beanRole,
    global: true,
  },
  user: {
    bean: beanUser,
    global: true,
  },
  util: {
    bean: beanUtil,
    global: true,
  },
  category: {
    bean: beanCategory,
    global: true,
  },
  tag: {
    bean: beanTag,
    global: true,
  },
  bodyCrypto: {
    bean: beanBodyCrypto,
    global: true,
  },
  stash: {
    bean: beanStash,
    global: true,
  },
  atomStage: {
    bean: beanAtomStage,
    global: true,
  },
  atomState: {
    bean: beanAtomState,
    global: true,
  },
  formAction: {
    bean: beanFormAction,
    global: true,
  },
  // stats
  'stats.draftsCommon': {
    bean: statsDraftsCommon,
  },
  'stats.stars': {
    bean: statsStars,
  },
  'stats.labels': {
    bean: statsLabels,
  },
  'stats.starsLabels': {
    bean: statsStarsLabels,
  },
  // summer
  'summer.cache.atomClassInner': {
    bean: summerCacheAtomClassInner,
  },
  'summer.cache.roleScopesOfUser': {
    bean: summerCacheRoleScopesOfUser,
  },
  'summer.cache.roleScopesOfRole': {
    bean: summerCacheRoleScopesOfRole,
  },
  'summer.cache.roleScopesMineOfUser': {
    bean: summerCacheRoleScopesMineOfUser,
  },
  'summer.cache.roleWhosOfAtomClassAction': {
    bean: summerCacheRoleWhosOfAtomClassAction,
  },
  'summer.cache.roleParentsOfUser': {
    bean: summerCacheRoleParentsOfUser,
  },
};
