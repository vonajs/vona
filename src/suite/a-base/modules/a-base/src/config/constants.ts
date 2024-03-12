import { __ThisModule__ } from '../resource/this.js';
import { AtomClassMeta } from '../types.js';

// action
const action = {
  create: 1,
  read: 2,
  write: 3,
  delete: 4,
  clone: 5,
  enable: 6,
  disable: 7,
  layout: 15,
  viewWorkflow: 16,
  viewHistory: 17,
  // report: 18,
  moveUp: 21,
  moveDown: 22,

  authorize: 25,

  deleteBulk: 35,
  exportBulk: 36,
  importBulk: 37,
  // reportBulk: 38,
  layoutBulk: 45,

  save: 51,
  submit: 52,
  history: 53,
  formal: 54,
  draft: 55,

  //
  draftStatsBulk: 71,
  readBulk: 72,

  custom: 100, // custom action start from custom
};
// actionMeta
const actionMeta = {
  create: {
    title: 'Create',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    bulk: true,
    select: false,
    icon: { f7: '::add' },
    createDelay: true,
  },
  read: {
    title: 'View',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    // actionPath: '/a/basefront/atom/item?mode=view&atomId={{atomId}}&itemId={{itemId}}',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    icon: { f7: '::visibility' },
  },
  write: {
    title: 'Edit',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: false,
    enableOnOpened: false,
    enableOnFlowing: false,
    directShowOnSwipeout: true,
    directShowOnList: true,
    icon: { f7: '::edit' },
    color: 'orange',
  },
  delete: {
    title: 'Delete',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: false,
    enableOnOpened: false,
    enableOnFlowing: false,
    directShowOnSwipeout: true,
    directShowOnList: true,
    icon: { f7: '::delete' },
    color: 'red',
  },
  clone: {
    title: 'Clone',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    icon: { f7: ':outline:copy-outline' },
  },
  enable: {
    title: 'Enable',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    enableOnAtomDisabled: true,
    directShowOnList: true,
    stage: 'formal',
    icon: { f7: '::play-arrow' },
  },
  disable: {
    title: 'Disable',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    enableOnAtomDisabled: false,
    directShowOnList: true,
    stage: 'formal',
    icon: { f7: '::stop' },
  },
  layout: {
    title: 'Layout',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    disableOnList: true,
    icon: { f7: '::view-list' },
  },
  viewWorkflow: {
    title: 'ViewWorkFlow',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: null,
    enableOnOpened: false,
    enableOnFlowing: null,
    directShowOnList: true,
    stage: 'draft,formal',
    icon: { f7: '::timeline' },
  },
  viewHistory: {
    title: 'ViewHistory',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    directShowOnList: false,
    stage: 'draft,formal',
    icon: { f7: ':outline:work-history-outline' },
  },
  authorize: {
    title: 'Authorize',
    actionModule: __ThisModule__,
    actionPath: '/a/basefront/resource/authorize?atomId={{atomId}}&itemId={{itemId}}',
    enableOnStatic: null,
    enableOnOpened: null,
    enableOnFlowing: null,
    directShowOnList: true,
    stage: 'formal',
    icon: { f7: '::groups' },
  },
  deleteBulk: {
    title: 'BatchDelete',
    actionModule: __ThisModule__,
    actionComponent: 'actionBulk',
    bulk: true,
    select: true,
    icon: { f7: '::delete' },
  },
  exportBulk: {
    title: 'Export',
    actionModule: __ThisModule__,
    actionComponent: 'actionBulk',
    bulk: true,
    select: null,
    icon: { f7: '::export' },
    params: {
      transaction: false,
    },
  },
  importBulk: {
    title: 'Import',
    actionModule: __ThisModule__,
    actionComponent: 'actionBulk',
    bulk: true,
    select: false,
    icon: { f7: '::import' },
    params: {
      file: {
        mode: 'buffer',
      },
      progress: true,
      transaction: true,
      accept: '',
    },
  },
  layoutBulk: {
    title: 'Layout',
    actionModule: __ThisModule__,
    actionComponent: 'actionBulk',
    bulk: true,
    select: false,
    icon: { f7: '::view-list' },
  },
  draftStatsBulk: {
    title: 'Draft',
    actionModule: __ThisModule__,
    actionComponent: 'actionBulk',
    render: {
      module: 'a-baserender',
      name: 'renderAtomListDraftStats',
    },
    bulk: true,
    select: false,
    stage: 'formal',
    icon: { f7: ':outline:draft-outline' },
    authorize: false,
  },
  readBulk: {
    title: 'List',
    actionModule: __ThisModule__,
    actionComponent: 'actionBulk',
    bulk: true,
    select: false,
    icon: { f7: '::visibility' },
    authorize: false,
  },
  save: {
    title: 'Save',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    authorize: false,
    icon: { f7: '::save' },
  },
  submit: {
    title: 'Submit',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    authorize: false,
    icon: { f7: '::done' },
  },
  formal: {
    title: 'Formal',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    authorize: false,
    icon: { f7: ':outline:archive-outline' },
  },
  draft: {
    title: 'Draft',
    actionModule: __ThisModule__,
    actionComponent: 'action',
    authorize: false,
    icon: { f7: ':outline:draft-outline' },
  },
  custom: {
    title: 'Custom',
  },
};
// actionMetaItemOnly
const actionMetaItemOnly = { ...actionMeta };
// actionMetaItemOnly.create = Object.assign({}, actionMetaItemOnly.create, { createDelay: true });
// atomClassMeta
const atomClassMeta = {
  simple: false,
  itemOnly: false,
  inner: false,
  language: false,
  category: false,
  tag: false,
  history: false,
  comment: true,
  attachment: true,
  cms: false,
  enableRight: {
    mine: true,
    role: {
      scopes: true,
    },
  },
} as Partial<AtomClassMeta>;

const atomClassMetaItemOnly = {
  simple: true,
  itemOnly: true,
  inner: true,
  language: false,
  category: false,
  tag: false,
  history: false,
  comment: false,
  attachment: false,
  cms: false,
  enableRight: {
    mine: false,
    role: true,
  },
} as Partial<AtomClassMeta>;

const atomClassMetaDetail = {
  simple: true,
  itemOnly: true,
  detail: {
    inline: true,
    atomClassMain: undefined,
  },
  inner: true,
  language: false,
  category: false,
  tag: false,
  history: false,
  comment: false,
  attachment: false,
  cms: false,
  enableRight: false,
  fields: {
    mappings: {
      atomIdMain: 'atomIdMain',
    },
  },
} as Partial<AtomClassMeta>;
// systemRoles
const systemRoles = [
  'root',
  'anonymous',
  'authenticated',
  'template',
  'system',
  'registered',
  'activated',
  'superuser',
  'builtIn',
  'organization',
  'internal',
  'external',
];
// atom
const atom = {
  stage: {
    draft: 0,
    formal: 1,
    history: 2,
  },
  action,
  actionMeta,
  actionMetaItemOnly,
};
// ok
export const constants = {
  systemRoles,
  atom,
  atomClass: {
    meta: atomClassMeta,
    metaItemOnly: atomClassMetaItemOnly,
    metaDetail: atomClassMetaDetail,
  },
};
