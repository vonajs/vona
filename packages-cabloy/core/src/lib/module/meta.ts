import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from './reload.js';
import metaEnvFn from './metaEnv.js';
import { CabloyApplication } from '../../types/index.js';
import { AppMeta } from '../../types/application/meta.js';
import { AppUtil } from '../utils/util.js';

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
  meta.mockUtil = app.bean._newBean(AppMockUtil);

  // reload
  meta.reload = app.bean._newBean(AppReload);

  // meta
  return meta;
}
