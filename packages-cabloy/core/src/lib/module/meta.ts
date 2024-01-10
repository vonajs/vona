import * as uuid from 'uuid';
import utilFn from '../utils/util.js';
import mockUtilFn from '../utils/mockUtil.js';
import reloadFn from './reload.js';
import metaEnvFn from './metaEnv.js';
import { CabloyApplication } from '../../types/index.js';

export default function (app: CabloyApplication) {
  // meta
  if (!app.meta) app.meta = {};
  const meta = app.meta;

  // workerId
  meta.workerId = uuid.v4();

  // app or agent
  meta.inApp = app.type === 'application';
  meta.inAgent = app.type === 'agent';

  // env
  metaEnvFn(app, meta);

  // util
  meta.util = utilFn(app);

  // mockUtil
  meta.mockUtil = mockUtilFn(loader.app);

  // reload
  meta.reload = reloadFn(loader.app);

  // meta
  return meta;
}
