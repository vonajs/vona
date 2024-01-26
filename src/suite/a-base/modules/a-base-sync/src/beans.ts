const versionManager = require('./bean/version.manager.js');
const atomResource = require('./bean/atom.resource.js');
const atomRole = require('./bean/atom.role.js');
const atomRoleRight = require('./bean/atom.roleRight.js');
const atomRoleRightSpread = require('./bean/atom.roleRightSpread.js');
const atomRoleResourceRight = require('./bean/atom.roleResourceRight.js');
const atomRoleResourceRightSpread = require('./bean/atom.roleResourceRightSpread.js');
const atomRoleFieldsRight = require('./bean/atom.roleFieldsRight.js');
const atomRoleFieldsRightSpread = require('./bean/atom.roleFieldsRightSpread.js');
const atomUser = require('./bean/atom.user.js');
const atomUserAtomRight = require('./bean/atom.userAtomRight.js');
const atomUserResourceRight = require('./bean/atom.userResourceRight.js');
const atomUserFieldsRight = require('./bean/atom.userFieldsRight.js');
const localProcedure = require('./bean/local.procedure.js');
const localStash = require('./bean/local.stash.js');
const queueSchedule = require('./bean/queue.schedule.js');
const queueRoleBuild = require('./bean/queue.roleBuild.js');
const startupLoadSchedules = require('./bean/startup.loadSchedules.js');
const startupLoadAtomStatics = require('./bean/startup.loadAtomStatics.js');
const startupCheckResourceLocales = require('./bean/startup.checkResourceLocales.js');
const startupCheckViewHistoryRight = require('./bean/startup.checkViewHistoryRight.js');
const middlewareInner = require('./bean/middleware.inner.js');
const middlewareTest = require('./bean/middleware.test.js');
const middlewareTransaction = require('./bean/middleware.transaction.js');
const middlewareGate = require('./bean/middleware.gate.js');
const middlewareCors = require('./bean/middleware.cors.js');
const middlewareAuth = require('./bean/middleware.auth.js');
const middlewareAuthOpen = require('./bean/middleware.authOpen.js');
const middlewareRight = require('./bean/middleware.right.js');
const middlewareJsonp = require('./bean/middleware.jsonp.js');
const middlewareHttpLog = require('./bean/middleware.httpLog.js');
const middlewareIOConnectionAuth = require('./bean/middleware.io.connectionAuth.js');
const beanAtomBase = require('./bean/bean.atomBase.js');
const beanAtom = require('./bean/bean.atom.js');
const beanAtomAction = require('./bean/bean.atomAction.js');
const beanAtomClass = require('./bean/bean.atomClass.js');
const beanAtomRightAux = require('./bean/bean.atomRightAux.js');
const beanAtomStatic = require('./bean/bean.atomStatic.js');
const beanAuth = require('./bean/bean.auth.js');
const beanBase = require('./bean/bean.base.js');
const beanResource = require('./bean/bean.resource.js');
const beanRole = require('./bean/bean.role.js');
const beanUser = require('./bean/bean.user.js');
const beanUtil = require('./bean/bean.util.js');
const beanCategory = require('./bean/bean.category.js');
const beanTag = require('./bean/bean.tag.js');
const beanBodyCrypto = require('./bean/bean.bodyCrypto.js');
const beanStash = require('./bean/bean.stash.js');
const beanAtomStage = require('./bean/bean.atomStage.js');
const beanAtomState = require('./bean/bean.atomState.js');
const beanFormAction = require('./bean/bean.formAction.js');
const statsDraftsCommon = require('./bean/stats.draftsCommon.js');
const statsStars = require('./bean/stats.stars.js');
const statsLabels = require('./bean/stats.labels.js');
const statsStarsLabels = require('./bean/stats.starsLabels.js');
const summerCacheAtomClassInner = require('./bean/summer.cache.atomClassInner.js');
const summerCacheRoleScopesOfUser = require('./bean/summer.cache.roleScopesOfUser.js');
const summerCacheRoleScopesOfRole = require('./bean/summer.cache.roleScopesOfRole.js');
const summerCacheRoleScopesMineOfUser = require('./bean/summer.cache.roleScopesMineOfUser.js');
const summerCacheRoleWhosOfAtomClassAction = require('./bean/summer.cache.roleWhosOfAtomClassAction.js');
const summerCacheRoleParentsOfUser = require('./bean/summer.cache.roleParentsOfUser.js');

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
