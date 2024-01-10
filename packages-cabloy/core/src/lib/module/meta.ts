import * as uuid from 'uuid';
import utilFn from '../utils/util.js';
import mockUtilFn from '../utils/mockUtil.js';
import reloadFn from './reload.js';
import metaEnvFn from './metaEnv.js';

export default function (loader) {
  // meta
  if (!loader.app.meta) loader.app.meta = {};
  const meta = loader.app.meta;

  // workerId
  meta.workerId = uuid.v4();

  // app or agent
  meta.inApp = loader.app.type === 'application';
  meta.inAgent = loader.app.type === 'agent';

  // env
  metaEnvFn(loader.app, meta);

  // util
  meta.util = utilFn(loader.app);

  // mockUtil
  meta.mockUtil = mockUtilFn(loader.app);

  // reload
  meta.reload = reloadFn(loader.app);

  // meta
  return meta;
}
