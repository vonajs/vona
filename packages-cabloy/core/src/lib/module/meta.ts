import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from './reload.js';
import { AppUtil } from '../utils/util.js';
import { BeanBase } from './bean/beanBase.js';

export class AppMeta extends BeanBase {
  workerId: string;
  inApp: boolean;
  inAgent: boolean;
  isProd: boolean;
  isTest: boolean;
  isLocal: boolean;
  util: AppUtil;
  mockUtil: AppMockUtil;
  reload: AppReload;

  constructor() {
    super();

    // workerId
    this.workerId = uuid.v4();

    // app or agent
    this.inApp = this.app.type === 'application';
    this.inAgent = this.app.type === 'agent';

    // env
    //   isProd
    this.isProd =
      this.app.config.env !== 'local' && this.app.config.env !== 'unittest' && this.app.config.env !== 'test';
    //   isTest
    this.isTest = this.app.config.env === 'unittest' || this.app.config.env === 'test';
    //   isLocal
    this.isLocal = this.app.config.env === 'local';

    // util
    this.util = this.app.bean._newBean(AppUtil);

    // mockUtil
    this.mockUtil = this.app.bean._newBean(AppMockUtil);

    // reload
    this.reload = this.app.bean._newBean(AppReload);
  }
}
