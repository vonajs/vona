import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from '../module/reload.js';
import { AppUtil } from '../utils/util.js';
import { BeanBase } from '../module/bean/beanBase.js';
import { AppMessenger } from '../module/messenger.js';
import { IMonkeyApp } from '../../type/interface/monkey.js';
import { AppRouter } from '../module/route.js';
import { AppLimiter, AppRedlock } from '../module/redis.js';
import { QueueClient } from '../module/queue/queueClient.js';
import { BroadcastClient } from '../module/broadcast/broadcastClient.js';
import { CabloyContext, IModule, ISuite } from '../../type/index.js';
import { AppResource, appResource } from './resource.js';

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
  messenger: AppMessenger;
  appMonkey?: IMonkeyApp;
  router: AppRouter;
  limiter: AppLimiter;
  redlock: AppRedlock;
  queue: QueueClient;
  broadcast: BroadcastClient;
  //
  resource: AppResource;
  //
  beans: Record<string, any>;
  aops: Record<string, any>;
  //
  suites: Record<string, ISuite>;
  modules: Record<string, IModule>;
  modulesArray: IModule[];
  modulesMonkey: Record<string, IModule>;
  //
  configs: Record<string, any>;
  constants: Record<string, any>;
  //
  middlewares: any[];
  middlewaresNormal: Record<string, any>;
  middlewaresGlobal: any[];
  middlewaresSocketIoConnection: any[];
  middlewaresSocketIoPacket: any[];
  //
  queues: Record<string, any>;
  broadcasts: Record<string, any>;
  schedules: Record<string, any>;
  //
  appReadyInstances: Record<string, any>;
  //
  __versionReady: boolean;
  __versionReadyError: Error;
  //
  _loadQueueWorkers: ({ subdomain }: { subdomain: string }) => void;
  _loadSchedules: ({ ctx }: { ctx: CabloyContext }) => Promise<void>;
  _runSchedule: (context) => Promise<any>;
  checkAppReady: () => Promise<boolean>;

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

    // resource
    this.resource = appResource;
    this.resource.app = this.app;
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
