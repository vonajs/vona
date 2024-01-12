import * as uuid from 'uuid';
import { AppMockUtil } from '../utils/mockUtil.js';
import { AppReload } from './reload.js';
import { AppUtil } from '../utils/util.js';
import { BeanBase } from './bean/beanBase.js';
import { AppMessenger } from './messenger.js';
import { IMonkeyApp } from '../../types/interface/monkey.js';
import { AppRouter } from './route.js';
import { AppLimiter, AppRedlock } from './redis.js';
import { QueueClient } from './queue/queueClient.js';
import { BroadcastClient } from './broadcast/broadcastClient.js';
import { CabloyContext } from '../../types/index.js';
import { IAppModule, IAppSuite } from '../../types/interface/module.js';

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
  messenger: AppMessenger = null as any;
  appMonkey?: IMonkeyApp;
  router: AppRouter = null as any;
  limiter: AppLimiter = null as any;
  redlock: AppRedlock = null as any;
  queue: QueueClient = null as any;
  broadcast: BroadcastClient = null as any;
  //
  beans: Record<string, any> = null as any;
  aops: Record<string, any> = null as any;
  //
  suites: Record<string, IAppSuite> = null as any;
  modules: Record<string, IAppModule> = null as any;
  modulesArray: IAppModule[] = null as any;
  modulesMonkey: Record<string, IAppModule> = null as any;
  //
  configs: Record<string, any> = null as any;
  constants: Record<string, any> = null as any;
  //
  middlewares: any[] = null as any;
  middlewaresNormal: Record<string, any> = null as any;
  middlewaresGlobal: any[] = null as any;
  middlewaresSocketIoConnection: any[] = null as any;
  middlewaresSocketIoPacket: any[] = null as any;
  //
  queues: Record<string, any> = null as any;
  broadcasts: Record<string, any> = null as any;
  schedules: Record<string, any> = null as any;
  //
  appReadyInstances: Record<string, any> = null as any;
  //
  __versionReady: boolean = false;
  __versionReadyError: Error = null as any;
  //
  _loadQueueWorkers: ({ subdomain }: { subdomain: string }) => void = null as any;
  _loadSchedules: ({ ctx }: { ctx: CabloyContext }) => Promise<void> = null as any;
  _runSchedule: (context) => Promise<any> = null as any;
  checkAppReady: () => Promise<boolean> = null as any;

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
