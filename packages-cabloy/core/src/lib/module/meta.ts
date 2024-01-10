import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from './reload.js';
import { AppUtil } from '../utils/util.js';
import { BeanBase } from './bean/beanBase.js';

export class AppMeta extends BeanBase {
  workerId: string = null as any;
  inApp: boolean = false;
  inAgent: boolean = false;
  isProd: boolean = false;
  isTest: boolean = false;
  isLocal: boolean = false;
  util: AppUtil = null as any;
  mockUtil: AppMockUtil = null as any;
  reload: AppReload = null as any;
  beans: Record<string, any> = null as any;
  aops: Record<string, any> = null as any;

  __init__() {
    // workerId
    this.workerId = uuid.v4();

    // app or agent
    this.inApp = this.app.type === 'application';
    this.inAgent = this.app.type === 'agent';

    // env
    this.prepareEnv();

    // util
    this.util = this.app.bean._newBean(AppUtil);

    // mockUtil
    this.mockUtil = this.app.bean._newBean(AppMockUtil);

    // reload
    this.reload = this.app.bean._newBean(AppReload);
  }

  prepareEnv() {
    // isProd
    this.isProd =
      this.app.config.env !== 'local' && this.app.config.env !== 'unittest' && this.app.config.env !== 'test';
    // isTest
    this.isTest = this.app.config.env === 'unittest' || this.app.config.env === 'test';
    // isLocal
    this.isLocal = this.app.config.env === 'local';
  }
}
