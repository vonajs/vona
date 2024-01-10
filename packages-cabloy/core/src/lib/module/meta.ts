import * as uuid from 'uuid';
import utilFn from '../utils/util.js';
import mockUtilFn from '../utils/mockUtil.js';
import reloadFn from './reload.js';
import metaEnvFn from './metaEnv.js';
import { CabloyApplication } from '../../types/index.js';
import { AppMeta } from '../../types/application/meta.js';
import AppUtil from '../utils/util.js';

export default function (app: CabloyApplication) {
  // meta
  if (!app.meta) app.meta = {} as AppMeta;
  const meta = app.meta;

  // workerId
  meta.workerId = uuid.v4();

  // app or agent
  meta.inApp = app.type === 'application';
  meta.inAgent = app.type === 'agent';

  // env
  metaEnvFn(app, meta);

  // util
  meta.util = app.bean._newBean(AppUtil);

  // mockUtil
  meta.mockUtil = mockUtilFn(loader.app);

  // reload
  meta.reload = reloadFn(loader.app);

  // meta
  return meta;
}
